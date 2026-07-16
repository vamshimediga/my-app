import { ChangeDetectorRef, DestroyRef, inject } from '@angular/core';

export abstract class BaseComponent {

  protected cdr = inject(ChangeDetectorRef);
  protected destroyRef = inject(DestroyRef);

  /**
   * Force UI Refresh
   */
  protected refresh(): void {
    this.cdr.detectChanges();
  }

  /**
   * Mark Component For Check
   */
  protected markForCheck(): void {
    this.cdr.markForCheck();
  }

}