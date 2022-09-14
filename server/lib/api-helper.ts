

    
 import { AssertionResponse } from 'degen-route-loader'
import mongoose from 'mongoose'
import web3utils from 'web3-utils'
import { priceToCents } from './parse-helper'

    export default class APIHelper  {
    
        static buildSlug( input:string  ) : string {

            let replaced:string = input.replace(' ','-')

            return APIHelper.sanitizeInput(replaced, 'string')
        }

        static getRandomColorHex():string{
            return '#0088CC'
        }


        static sanitizeAndValidateInputs(fields:any, specification:any){

            let validation = APIHelper.validateExists(
                Object.keys(specification),
                 fields)
            if(!validation.success) return validation

            let data = {}


            for(let [key,value] of Object.entries(specification)){

                let typeString:string = typeof value == 'string' ? value : 'string'

                data[key] = APIHelper.sanitizeInput( fields[key], typeString ) 

            }




            return {success:true, data }
        }

        static validateExists(props:string[], input:any) : AssertionResponse{

            for(let prop of props){
                if(!input[prop]) return {success:false, error:`Missing ${prop}`}
            }

            return {success: true}

        }



        static sanitizeInput(input: any,type:string){

            if(typeof input == 'undefined'){
                return undefined
            }

            if(type.startsWith('json_')){

                let baseType = type.substring(5,type.length)

                return   APIHelper.sanitizeInput(JSON.parse( input ) , baseType )  
            }

            if(type.endsWith('[]')){
                let result: any[] = []

                let baseType = type.substring(0,type.length-2)
                
                for(let entry of input){
                    if(typeof entry != 'undefined'){
                        

                        result.push( APIHelper.sanitizeInput(entry, baseType ) )
                    }
                    
                }

                return result 
            }

            if(type == 'number'){

                let result = parseInt(input)
                if (isNaN(result)) { return 0 }

                return result 
            }

            //fix me up  unit tests !! 
            if(type == 'price'){

                let result = priceToCents(input)
               // if (isNaN(result)) { return 0 }

                return result 
            }

          

            if(type == 'string'){
                return APIHelper.escapeString(input.toLowerCase())
            }


            if(type == 'text'){
                return APIHelper.escapeString(input)
            }

            if(type == 'email'){

                if(!input.includes('@')){
                    throw new Error(`Invalid email address`)
                }


                return APIHelper.escapeString(input)
            }

            if(type == 'phone'){

                
                return APIHelper.escapeString(input)
            }


            if(type == 'boolean'){

                
                return (input === 'true')
            }

         


            if(type == 'cartitem'){

                let result =  {
                    purchaseableId: APIHelper.sanitizeInput(input.purchaseableId,'string'),
                    quantity: APIHelper.sanitizeInput(input.quantity,'number')

                }             

                return result 
            }


            if(type == 'publicaddress'){

                 try{
                    return web3utils.toChecksumAddress(input) 
                 }catch(error){
                     return undefined 
                 }     

                 
            }


            if(type == 'shippingDetails'){

                let result =  {
                    streetName: APIHelper.sanitizeInput(input.streetName,'string'),
                    stateCode: APIHelper.sanitizeInput(input.stateCode,'string'),
                    countryCode: APIHelper.sanitizeInput(input.countryCode,'string'),
                    zipCode: APIHelper.sanitizeInput(input.zipCode,'number'),
                    phone: APIHelper.sanitizeInput(input.phone,'phone'),
                    email: APIHelper.sanitizeInput(input.email,'email'),
                    parentOrderId : APIHelper.sanitizeInput(input.parentOrderId,'string')


                }             

                return result 
            }


            throw new Error(`Unable to sanitize input of type ${type}`)
        }

         


        static escapeString(input: string) : string {
        
            return encodeURI(input)
        }
    
        static unescapeString(input: string) : string {
            
            return decodeURI(input)
        }

        static toChecksumAddress( address:string  ){

            return web3utils.toChecksumAddress(address) 
        }

        static async getMaxValue( model:any, attributeName:string ){

            let query:any = {} 
            query[attributeName] = -1 

            let record = await model.findOne({}).sort(query) 
            
            if(record){
                return record[attributeName]
            }

            return 0 
        }
         
    }