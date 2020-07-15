import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.scss'],
})
export class ProductReadComponent implements OnInit {
  products: Product[];
  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productService.read().subscribe((products) => {
      this.products = products;
    });
  }

  openConfirmDelete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDelete, { data: { id } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.deleteProduct(id);
    });
  }

  deleteProduct(id: string): void {
    this.productService.delete(id).subscribe(() => {
      this.productService.showMessage('Deletado com sucesso!');
      this.productService.read().subscribe((products) => {
        this.products = products;
      });
    });
  }
}

@Component({
  selector: 'confirm-delete',
  templateUrl: './confirm-delete.html',
})
export class ConfirmDelete {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
