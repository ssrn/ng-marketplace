import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainBannerComponent { }
