<template>
    <div>
        <h1>Dashboard</h1>
        <p v-if="loading">Loading...</p>
        <p v-if="error">{{ error }}</p>
        <ul v-if="currentPageJobs">
            <li v-for="item in currentPageJobs" :key="item.id">{{ item.title }}</li>
        </ul>
        <page-pagination
        :total-pages="totalPages"
        :per-page="perPage"
        :current-page="currentPage"
        @pagechanged="onPageChange"
        />
  </div>
</template>
  
<script>
//import  ProductComponent  from './components/ProductComponent.vue';
import PagePagination from '../components/PagePagination.vue'
import axios from "axios";

export default {
    name: "JobManagerDashboard", // useful for debugging purposes
    components: {
        // declared child components
        // Components that can be used in the template
        //ProductComponent,
        PagePagination
    },
    props: {
		// The parameters the component accepts
		// properties passed from parent
		
		//message: String,
		//product: Object,
		
		//email: {
		//  type: String,
		//  required: true,
		//  default: "none"
		  //validator: function (value) {
			// Should return true if value is valid
		  //}
		//}
	},
	emits: [ // events emitted by this component
	
	],
    // Component Lifecycle Hooks
	setup() {
        // Code within setup() runs before beforeCreate hook
		//console.log('Code inside setup()');
        // Other lifecycle hooks like created(), mounted(), etc. can follow
        },
    data() {  
        // component internal state variables
        return {
            //firstName: 'Vue',
            currentPageJobs: [],
            nextPageJobs: [],
            currentPage: 1,
            totalPages: 1,
            apiUrl:"http://192.168.1.99:8000/jobs",
            perPage: 25,
            loading: false,
            error: null
        } 
    }, 
    computed: {
        // computed properties
        // Return cached values until dependencies change
        //fullName: function () {
            //  return this.firstName + ' ' + this.lastName
            //}
            },
    watch: {
        // observed properties
        // Called when firstName changes value
        //firstName: function (value, oldValue) {  }
    },
	beforeCreate() {
        console.log("JobManagerDashboard - beforeCreate");
        },
	created() {
        console.log("JobManagerDashboard - created");
    },
	beforeMount() {
        console.log("JobManagerDashboard - beforeMount");
    },
	mounted() {
        console.log("JobManagerDashboard - mounted");
        console.log("fetching jobs from the jobs API...");
        this.fetchJobsPage(1)
    },
	beforeUpdate() {
        console.log("JobManagerDashboard - beforeUpdate");
    },
	updated() {
        console.log("JobManagerDashboard - updated");
    },
	activated() {
        console.log("JobManagerDashboard - activated");
    },
	deactivated() {
        console.log("JobManagerDashboard - deactivated");
    },
	
	
    beforeUnmount() {
        console.log("JobManagerDashboard - beforeUnmount");
    }, // beforeDestroy with Vue 2
	unmounted() {
        console.log("JobManagerDashboard - unmounted");
    }, // destroyed with Vue 2
    errorCaptured() {},

	methods:{  // component own methods
		//setFirstName() {  
		//  this.firstName='Joe'  
		//}
        async fetchJobsPage(page) {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(`${this.apiUrl}`,{
                    params:{
                        page: page,
                        perPage: this.perPage
                    }
                });
                let data = response.data;
                if (data){
                    this.totalPages = Math.ceil(data.documents_count / data.perPage)
                    this.perPage = data.perPage
                    this.currentPageJobs = data.data
                }
                
            } catch (err) {
                this.error = 'Failed to fetch data';
            } finally {
                this.loading = false;
            }
        },
        


        onPageChange(page) {
            console.log(page)
            this.currentPage = page;
            this.fetchJobsPage(page)
        }
	},

};
</script>

<style>

</style>