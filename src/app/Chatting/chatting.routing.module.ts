import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { PracticeComponent } from './practice/practice.component';
import { PublicComponent } from './public/public.component';
import { GroupComponent } from './group/group.component';
const routes:Routes=[{
 path:'private',component:ChatComponent},
 {
    path:'practice',component:PracticeComponent},
    {
        path:'public',component:PublicComponent},
    {path:'group',component:GroupComponent}]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class chatRoutingModule { }