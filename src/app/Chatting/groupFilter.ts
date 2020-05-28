
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'Filter'
})

export class GroupPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if(!value)return null;
        if(!args)return value;

        args = args.toLowerCase();
        return value.filter(function(item){
            return JSON.stringify(item.group_name).toLowerCase().includes(args);
        });
    }
}