import { HttpException, HttpStatus } from "@nestjs/common";
import { validate } from "class-validator";

export class ManualValidatorsHook{
    static async validateDtoByClassValidator(obj: any){
        const res = await validate(obj).then(errors => {
            // errors is an array of validation errors
            if (errors.length > 0) {
              let e = [];
              errors.forEach(element => {
                e.push(element.constraints);
              });
              return e;
            } else {
              console.log('validation succeed');
              return null;
            }
          });
          if (res ===  null)
            return true;
          throw new HttpException(res, HttpStatus.UNPROCESSABLE_ENTITY);
      }
}