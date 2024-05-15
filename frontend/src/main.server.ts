import { bootstrapApplication, createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { ApplicationRef } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { appConfig } from './app/app.config';
import { UserScreenComponent } from './app/user/user-screen/user-screen.component';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
