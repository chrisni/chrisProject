import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';

  columns = ['Toppings', 'Small(5$)', 'Medium(7$)', 'Large(8$)','Extra Large(9$)'];
  nonSelectionRow = ['Veg Toppings','Non Veg Toppings','Total','Offer',''];
  doubleRewardToppingForLargePizza = ['Barbecue chicken($3.00)','Pepperoni($2.00)'];
  orders = [];

  setHeader(title,index) {
    return title;
  }

  setData(data, title) {
    return data;
  }

  selectPizza(item, col, index)
  {
    if(this.nonSelectionRow.indexOf(item['Toppings']) > -1)
     return;

     let basePrice = this.getPizzaBasePrice(col);

    if(item[col] =='x')
    {
      item[col] = ''

      let pizza = this.orders.find( p => p.base == col);
      pizza.topping = pizza.topping.filter( t => t !== item['Toppings']);

      if(pizza.topping.length == 0)
      {
         this.orders = this.orders.filter( p => p.base !== col);
         this.data[this.data.length - 1][col] =   '';
      }
      else{
        pizza.price = pizza.price - item['Price'];
        pizza.toppingRewards = pizza.toppingRewards - this.getToppingRewards(col, item['Toppings']);

        let offer = this.getOffer(col,pizza.toppingRewards);
        pizza.offerPrice = this.getOfferPrice(offer, pizza.price);
    
        if(offer)
          this.data[this.data.length - 2][col] = offer;
        else
          this.data[this.data.length - 2][col] = '';
        
        let displyPrice = offer ? pizza.offerPrice : pizza.price;
        this.data[this.data.length - 1][col] =   displyPrice.toFixed(2).toString();
      } 
        
    }
    else
    {
      item[col] ='x'

      let pizza = this.orders.find( p => p.base == col);
      if(pizza)
      {
         pizza.topping.push(item['Toppings']);
         pizza.price = pizza.price + item['Price'];
         pizza.toppingRewards = pizza.toppingRewards + this.getToppingRewards(col, item['Toppings']);
      }
      else
      {   
        let toppingRewards = this.getToppingRewards(col, item['Toppings']);
        pizza = {base: col, topping:[item['Toppings']], price: basePrice + item['Price'],toppingRewards: toppingRewards}
        this.orders.push(pizza);
      }      

      let offer = this.getOffer(col,pizza.toppingRewards);
      pizza.offerPrice = this.getOfferPrice(offer, pizza.price);

      if(offer)
        this.data[this.data.length - 2][col] = offer;
      else
        this.data[this.data.length - 2][col] = '';

      let displyPrice = offer ? pizza.offerPrice : pizza.price;
      this.data[this.data.length - 1][col] =   displyPrice < 0.01 ? '' : displyPrice.toFixed(2).toString(); 
    }
  }

  getPizzaBasePrice(col)
  {
    switch (col) {
      case 'Small(5$)':
          return 5;
      case 'Medium(7$)':
          return 7;
      case 'Large(8$)':
        return 8;
      case 'Extra Large(9$)':
        return 9;
    }
  }
  
  getOffer(col, toppingsRewards)
  {
      if(col == 'Medium(7$)' && toppingsRewards == 2)
      {
        return 'Offer1'
      }

      //offer 2 does not work since the UI only offers one pizza for each size.

      if(col == 'Large(8$)' && toppingsRewards == 4)
      {
        return 'Offer3'
      }
  }

  getOfferPrice(offer, totalPrice)
  {
    if(offer == 'Offer1')
      return 5;
    
    if(offer == 'Offer3')
      return totalPrice * 0.5;
    
    return totalPrice;
  }

  getToppingRewards(col, topping)
  {
    if(col == 'Large(8$)' && this.doubleRewardToppingForLargePizza.indexOf(topping) > -1 )
      return 2;
    else 
      return 1;
  }

  upateTotal()
  {

  }

  data = [
    {
      "Toppings": 'Veg Toppings'
    },
    {
      "Toppings": 'Tomatoes($1.00)',
      "Small(5$)": '',
      "Medium(7$)": '',
      "Large(8$)": null,
      "Extra Large(9$)": null,
      "Price": 1.00
    },
    {
      "Toppings": 'Onions($0.50)',
      "Small(5$)": '',
      "Medium(7$)": '',
      "Large(8$)": '',
      "Extra Large(9$)": '',
      "Price": 0.50
    },
    {
      "Toppings": 'Bell pepper($1.00)',
      "Small(5$)": '',
      "Medium(7$)": '',
      "Large(8$)": '',
      "Extra Large(9$)": '',
      "Price": 1.00
    },
    {
      "Toppings": 'Mushrooms($1.20)',
      "Small(5$)": '',
      "Medium(7$)": '',
      "Large(8$)": '',
      "Extra Large(9$)": '',
      "Price": 1.20
    },
    {
      "Toppings": 'Pineapple($0.75)',
      "Small(5$)": '',
      "Medium(7$)": '',
      "Large(8$)": '',
      "Extra Large(9$)": '',
      "Price": 0.75
    },
    {
      "Toppings": 'Non Veg Toppings'
    },
    {
      "Toppings": 'Sausage($1.00)',
      "Small(5$)": '',
      "Medium(7$)": '',
      "Large(8$)": '',
      "Extra Large(9$)": '',
      "Price": 1.00
    },
    {
      "Toppings": 'Pepperoni($2.00)',
      "Small(5$)": '',
      "Medium(7$)": '',
      "Large(8$)": '',
      "Extra Large(9$)": '',
      "Price": 2.00
    },
    {
      "Toppings": 'Barbecue chicken($3.00)',
      "Small(5$)": '',
      "Medium(7$)": '',
      "Large(8$)": '',
      "Extra Large(9$)":'',
      "Price": 3.00
    },
    {
      "Toppings": 'Total'
    },
    {
      "Toppings": 'Offer'
    },
    {
      "Toppings": '',
      "Small(5$)": '',
      "Medium(7$)": '',
      "Large(8$)": '',
      "Extra Large(9$)":'',
    },
  ]
}

