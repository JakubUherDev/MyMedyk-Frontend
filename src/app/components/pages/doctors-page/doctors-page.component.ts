import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../common/doctors/doctors.service';

@Component({
    selector: 'app-doctors-page',
    templateUrl: './doctors-page.component.html',
    styleUrls: ['./doctors-page.component.scss']
})
export class DoctorsPageComponent implements OnInit {

    public doctorsData: any;
    public options: any;


  constructor(
        private content: DoctorsService
    ) {
        this.content.getData().subscribe((doctorsData: any) => {
          this.doctorsData = doctorsData.data;

          this.options = []
          doctorsData.data.map((doctor: any) => {
            if(this.options.filter((o: any) => o.name === doctor.attributes.designation).length == 0) {
              const x = {
                name: doctor.attributes.designation,
                value: doctor.attributes.designation,
                checked: true
              }
              this.options.push(x)
            }
          })

        });
    }

    ngOnInit(): void {}

    currentPage : any;
    onPageChange(page: number) {
        this.currentPage = page;
        window.scrollTo(0, 0);
    }

  get selectedOptions() {
    const x = this.options
      .filter((opt: any) => opt.checked)
      .map((opt: any) => opt.value)
    return this.doctorsData.filter((doc: any) => x.includes(doc.attributes.designation)).map((doc: any) => doc)
  }

  resetSelectedOptions() {
      this.options.forEach((option: any) => option.checked = false)
  }
}
