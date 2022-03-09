import {Resolver, Query, Mutation, Arg, Field, InputType, Int } from "type-graphql";
import { Archivo } from "../entity/Archivo";
import {GraphQLUpload} from 'graphql-upload';
import { finished } from 'stream/promises';

@InputType()
class FileInput {
    @Field()
    filename!: string
    @Field()
    mimetype!: string
    @Field()
    encoding!: string
}

@InputType()
class FileUpdateInput {

    @Field(()=>String, {nullable: true})
    filename?: string;

    @Field(()=>String, {nullable: true})
    mimeType?: string;

    @Field(()=>String, {nullable: true})
    encoding?: string;

}



@Resolver()
export class FileResolver {
    
    @Mutation(()=> Archivo)
    async createFile(
        @Arg("variables", () => FileInput) variables: FileInput
    ){
        const newFile = Archivo.create(variables);
        console.log(newFile);
        return await newFile.save();
        
    }

    @Mutation(()=>Boolean)
    async deleteFile(@Arg("id", () => Int) id: number){
        //console.log(id)
        await Archivo.delete(id)
        return true
    }

    @Mutation(()=>Boolean)
    async updateFile (
        @Arg("id",()=>Int) id: number,
        @Arg("fields",()=>FileUpdateInput) fields: FileUpdateInput
    ){
        await Archivo.update({id}, fields)
        return true
    }
    
    @Mutation(()=>Archivo)
    async singleUpload(@Arg("file",()=>GraphQLUpload) file: any){
        const { createReadStream, filename, mimetype, encoding } = await file;

        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams
        const stream = createReadStream();

        // This is purely for demonstration purposes and will overwrite the
        // local-file-output.txt in the current working directory on EACH upload.

        const out = require('fs').createWriteStream(filename);
        stream.pipe(out);
        await finished(out);
        const newFile = new Archivo();
        newFile.filename=filename
        newFile.mimetype=mimetype
        newFile.encoding=encoding
        //return { filename, mimetype, encoding };
        return await newFile.save();
    }

    saveFiles = (files: any[]) => new Promise((resolve,reject)=>{
        const filesSaved: Archivo[] = [];
        files.forEach(async (file,i)=>{
            const { createReadStream, filename, mimetype, encoding } = await file;

            // Invoking the `createReadStream` will return a Readable Stream.
            // See https://nodejs.org/api/stream.html#stream_readable_streams
            const stream = createReadStream();

            // This is purely for demonstration purposes and will overwrite the
            // local-file-output.txt in the current working directory on EACH upload.

            const out = require('fs').createWriteStream(filename);
            stream.pipe(out);
            await finished(out);
            const newFile = new Archivo();
            newFile.filename=filename
            newFile.mimetype=mimetype
            newFile.encoding=encoding
            filesSaved.push(await newFile.save())
            console.log(filename)
            if(i===files.length-1){
                resolve(filesSaved)
            }
            
        })
    })

    @Mutation(()=>[Archivo])
    async multiUpload(@Arg("files",()=>[GraphQLUpload]) files: any[]){
    
        return await this.saveFiles(files);
    
    }

    @Query(()=>[Archivo])
    archivos(){
        return Archivo.find()
    }
}