var eventBus = new Vue()

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image" >
        </div>
    
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else> Out of Stock</p>
            <p>Shipping: {{ shipping }} </p>
            <p>{{ isOnSale }}</p>
        

            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box" 
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">  
            </div>

            <button @click="addToCart" 
                :disabled="!inStock"
                :class="{ disabledButton :!inStock }"
                >
            Add to Cart
            </button>

        </div> 
        
        <product-tabs :reviews="reviews"></product-tabs>
       
    </div> 
    `,
    data() {
        return { 
        onSale: false,
        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant: 0,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantID: 2234,
                variantColor: "green",
                variantImage: './images/green-sock.jpeg',
                variantQuantity: 10,
                onSale: true
            },
            {
                variantID: 2235,
                variantColor: "blue",
                variantImage: './images/blue-sock.jpeg',
                variantQuantity: 0,
                onSale: false
            }
        ],
        reviews: []
        }
    },
        
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantID)
        },
        updateProduct: function (index) {
            this.selectedVariant = index
            console.log(index)
        }
       
    },
    computed: {
        title(){
            return this.brand + ' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        isOnSale(){
            if(this.variants[this.selectedVariant].onSale){
                return this.brand + ' ' + this.variants[this.selectedVariant].variantColor + ' ' + this.product + ' are on sale!'
            }
                return this.brand + ' ' + this.variants[this.selectedVariant].variantColor + ' ' + this.product + ' are not on sale!'
        },
        shipping() {
            if(this.premium){
                return "Free"
            }
            return 2.99

        }

    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

Vue.component('product-review', {
    template:`
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>

    <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
    </p>

    <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
    </p>

    <p>
        <input type="submit" value="Submit">
    </p>

    </form>

    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },

    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating){
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            }
            eventBus.$emit('review-submitted', productReview)
            this.name = null,
            this.review = null,
            this.rating = null
        }   else {
            if(!this.name) this.errors.push("Name required.")
            if(!this.review) this.errors.push("Review required.")
            if(!this.rating) this.errors.push("Rating required.")
        }
    }
    }
})

Vue.component('product-tabs', {
    props:{
        reviews: {
            type: Array,
            required: false
        }
    },
    template: `
    <div>
      
    <div>
      <span class="tabs" 
            :class="{ activeTab: selectedTab === tab }"
            v-for="(tab, index) in tabs"
            @click="selectedTab = tab"
            :key="tab"
      >{{ tab }}</span>
    </div>

    <div v-show="selectedTab === 'Reviews'">
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul v-else>
            <li v-for="(review, index) in reviews" :key="index">
              <p>{{ review.name }}</p>
              <p>Rating:{{ review.rating }}</p>
              <p>{{ review.review }}</p>
            </li>
        </ul>
    </div>

    <div v-show="selectedTab === 'Make a Review'">
      <product-review></product-review>
    </div>

  </div>

    `,
    data() {
        return {
            tabs: ['Reviews', ' ', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []

    },
    methods:{
        updateCart(id){
            this.cart.push(id)
        }
    }
    
})













                    <div class="row">
                        <div class="col-lg-12 text-center">
                            <h2>Portfolio</h2>
                            <hr class="star-primary">
                        </div>
                    </div>

                    <div class="row">
                        <div v-for="(picTab, index) in picTabs"
                            :key="picTab.tabId"
                            class="col-sm-4 portfolio-item">
                            <a><img :src="{ tabPic }" class="img-responsive img-thumbnail" alt=""></a>
                        </div>
                    </div>