import { TestBed } from '@angular/core/testing';

import { AuthorService } from './author.service';
import {ManagerFirebase} from "../../utils/manager-firebase";
import {MockManagerFirebase} from "../../test/MockManagerFirebase";

describe('AuthorService', () => {
    let service: AuthorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthorService,
                { provide: ManagerFirebase, useClass: MockManagerFirebase }
            ]
        });
        service = TestBed.inject(AuthorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

});
