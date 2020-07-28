import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostCreateComponent } from "../post-create/post-cteate.component";
import { PostListComponent } from "../post-list/post-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "src/app/angular-material/angular-material.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [PostCreateComponent, PostListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
  ],
})
export class PostModule {}
