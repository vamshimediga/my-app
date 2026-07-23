import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileService } from '../../../../core/services/file.service';
import { BaseComponent } from '../../../../core/base';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders extends BaseComponent implements OnInit {


  private messageService = inject(MessageService);


  selectedFile!: File;

  uploadedPath = '';

  files: any[] = [];



  constructor(
    private fileService: FileService
  ) {

    super();

  }



  ngOnInit(): void {

    this.loadFiles();

  }



  // Get All Files

  loadFiles(): void {


    this.fileService.getFiles()
      .subscribe({

        next: (response) => {


          if (response.success) {


            this.files = response.data;

            this.refresh();


          }


        },


        error: (err) => {


          console.log(err);


          this.messageService.add({

            severity: 'error',

            summary: 'Error',

            detail: 'Unable to load files'

          });


        }


      });


  }




  onFileChange(event: any): void {


    if (event.target.files.length > 0) {


      this.selectedFile = event.target.files[0];


    }


  }





  upload(): void {



    if (!this.selectedFile) {


      this.messageService.add({

        severity: 'warn',

        summary: 'Warning',

        detail: 'Please select a file'

      });


      return;


    }




    this.fileService.upload(this.selectedFile)

      .subscribe({



        next: (response) => {



          this.uploadedPath = response.data;



          this.messageService.add({

            severity: 'success',

            summary: 'Upload Successful',

            detail: response.message

          });




          // refresh table after upload

          this.loadFiles();



        },



        error: (err) => {



          console.log(err);



          this.messageService.add({

            severity: 'error',

            summary: 'Upload Failed',

            detail: 'File upload failed'

          });



        }



      });



  }







  download(fileName: string): void {



    this.fileService.download(fileName)

      .subscribe({



        next: (blob) => {



          const url = window.URL.createObjectURL(blob);



          const a = document.createElement('a');


          a.href = url;


          a.download = fileName;


          a.click();



          window.URL.revokeObjectURL(url);




          this.messageService.add({

            severity: 'success',

            summary: 'Download',

            detail: 'File downloaded successfully'

          });



        },



        error: (err) => {



          console.log(err);



          this.messageService.add({

            severity: 'error',

            summary: 'Download Failed',

            detail: 'Unable to download file'

          });



        }



      });



  }







  delete(fileName: string): void {



    this.fileService.delete(fileName)

      .subscribe({



        next: (response) => {



          this.messageService.add({

            severity: 'success',

            summary: 'Deleted',

            detail: response.message

          });




          // refresh after delete

          this.loadFiles();



        },



        error: (err) => {



          console.log(err);



          this.messageService.add({

            severity: 'error',

            summary: 'Delete Failed',

            detail: 'Unable to delete file'

          });



        }



      });



  }



}