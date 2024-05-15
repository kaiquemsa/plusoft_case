import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserScreenComponent } from "./user/user-screen/user-screen.component";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        CommonModule,
        RouterOutlet,
        UserScreenComponent,
        CommonModule,
        NavbarComponent
    ]
})
export class AppComponent {
  title = 'Plusoft';
}
