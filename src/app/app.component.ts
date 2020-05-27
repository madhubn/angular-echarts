import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { Observable, of } from "rxjs";
import { delay } from 'rxjs/operators';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
form: FormGroup;
  ordersData = [];
  categories: any[];
  categories12: any[];
isLoadingCategory: boolean;
  
  get f() {
    return this.form && this.form.controls;
  }

  // get categoriesFormArr(): FormArray {
  //   return this.f && <FormArray>this.f.categoriesFormArr
  // }

  get categoriesFormGroup(): FormGroup {
    return this.f && <FormGroup>this.f.categoriesFormGroup
  }

  get multiFormGroup(): FormGroup {
    return this.f && <FormGroup>this.f.multiFormGroup
  }


 
  get categoriesFormGroupSelectedIds(): string[] {
    let ids: string[] = [];
    for (var key in this.categoriesFormGroup.controls) {
      if (this.categoriesFormGroup.controls[key].value) {
        ids.push(key);
      }
    }
    return ids;
  }
  get multiFormGroupSelectedIds(): string[] {
    let ids: string[] = [];
    for (var key in this.multiFormGroup.controls) {
      if (this.multiFormGroup.controls[key].value) {
        ids.push(key);
      }
    }
    return ids;
  }

  // get categoriesFormArraySelectedIds(): string[] {
  //   return this.categories
  //     .filter((cat, catIdx) => this.categoriesFormArr.controls.some((control, controlIdx) => catIdx === controlIdx && control.value))
  //     .map(cat => cat.id);
  // }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({ 
      orders: new FormArray([])
    });

    // // async orders
    // of(this.getOrders()).subscribe(orders => {
    //   this.ordersData = orders;
    //   this.addCheckboxes();
    // });

    this.getCategories().subscribe(categories => {
      this.isLoadingCategory = false;
      this.categories = categories;
      this.categories12 = categories;
      // this.form.addControl("categoriesFormArr", this.buildCategoryFormArr(categories));
      this.form.addControl("categoriesFormGroup", this.buildCategoryFormGroup(categories));
      this.form.addControl("multiFormGroup", this.buildmultiFormGroup(categories));
    })
  }

  private addCheckboxes() {
    this.ordersData.forEach((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.orders as FormArray).push(control);
    });
  }

  getOrders() {
    return [
      { id: 100, name: 'order 1' },
      { id: 200, name: 'order 2' },
      { id: 300, name: 'order 3' },
      { id: 400, name: 'order 4' }
    ];
  }

  submit() {
    const selectedOrderIds = this.form.value.orders
      .map((v, i) => v ? this.ordersData[i].id : null)
      .filter(v => v !== null);
    console.log(selectedOrderIds);
  }

  onSubmit222() {
    console.log({ groupVal: this.categoriesFormGroupSelectedIds});
    alert(`
    formgroup selected ids ${this.categoriesFormGroupSelectedIds}`)
  }

  // buildCategoryFormArr(categories: any[], selectedCategoryIds: string[] = []): FormArray {
  //   const controlArr = categories.map(category => {
  //     let isSelected = selectedCategoryIds.some(id => id === category.id);
  //     return this.formBuilder.control(isSelected);
  //   })
  //   return this.formBuilder.array(controlArr, atLeastOneCheckboxCheckedValidator())
  // }

  buildCategoryFormGroup(categories: any[], selectedCategoryIds: string[] = []): FormGroup {
     let group = this.formBuilder.group({}, {
      validators: atLeastOneCheckboxCheckedValidator()
    });
    categories.forEach(category => {
      let isSelected = selectedCategoryIds.some(id => id === category.id);
      group.addControl(category.id, this.formBuilder.control(isSelected));
    })
    return group;
  }

  buildmultiFormGroup(categories: any[], selectedCategoryIds: string[] = []): FormGroup {
     let group = this.formBuilder.group({}, {
      validators: atLeastOneCheckboxCheckedValidator()
    });
    categories.forEach(category => {
      let isSelected = selectedCategoryIds.some(id => id === category.id);
      group.addControl(category.id, this.formBuilder.control(isSelected));
    })
    return group;
  }

   getCategories(): Observable<any[]> {
    let categories: any[] = [
      {
        id: 1,
        title: "Education & Reference"
      },
      {
        id: 2,
        title: "Lifestyle & Hobbies"
      },
      {
        id: 3,
        title: "Business & Office"
      }
    ];
    return of(categories).pipe(delay(1000));
  }

}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);
  
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}

export function atLeastOneCheckboxCheckedValidator(minRequired = 1): ValidatorFn {
  return function validate(formGroup: FormGroup) {
    let checked = 0;

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];

      if (control.value === true) {
        checked++;
      }
    });

    if (checked < minRequired) {
      return {
        requireCheckboxToBeChecked: true,
      };
    }

    return null;
  };
}