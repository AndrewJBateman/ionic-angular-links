import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "posts",
    loadChildren: () =>
      import("./pages/list/list.module").then((m) => m.ListPageModule),
  },
  {
    path: "posts/:slug",
    loadChildren: () =>
      import("./pages/post/post.module").then((m) => m.PostPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
