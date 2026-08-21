import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsServiceComponent } from './goods-service';

describe('GoodsService', () => {
  let component: GoodsServiceComponent;
  let fixture: ComponentFixture<GoodsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsServiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoodsServiceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
