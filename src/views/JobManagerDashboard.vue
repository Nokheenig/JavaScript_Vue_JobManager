<template>
    <div>
        <h1>Dashboard</h1>
        <page-pagination
        :total-pages="totalPages"
        :per-page="perPage"
        :current-page="currentPage"
        @pagechanged="onPageChange"
        />
        <div class="dashboardContainer">
            <div class="jobStatusCheckboxContainer">
                <p>Job status</p>
                <div class="jobStatusCheckboxButtons">
                    <a @click="jobsDisplayNone">
                        <div class="jobStatusCheckboxButton">
                            Select none
                        </div>
                    </a>
                    <a @click="jobsDisplayDefault">
                        <div class="jobStatusCheckboxButton">
                            Select Default
                        </div>
                    </a>
                </div>
                <div>
                    <input v-model="displayJobsStatus.Null" type="checkbox" @change="jobsDisplayUpdate">
                    Null
                </div>
                <div>
                    <input v-model="displayJobsStatus.New" type="checkbox" @change="jobsDisplayUpdate">
                    New
                </div>
                <div>
                    <input v-model="displayJobsStatus.Open_ReferalStage" type="checkbox" @change="jobsDisplayUpdate">
                    Open-Referal stage
                </div>
                <div>
                    <input v-model="displayJobsStatus.Open_ReadyToApply" type="checkbox" @change="jobsDisplayUpdate">
                    Open-Ready to apply
                </div>
                <div>
                    <input v-model="displayJobsStatus.OnGoing_SelectedForApplication" type="checkbox" @change="jobsDisplayUpdate">
                    OnGoing-Ready for application
                </div>
                <div>
                    <input v-model="displayJobsStatus.OnGoing_Applied" type="checkbox" @change="jobsDisplayUpdate">
                    OnGoing-Applied
                </div>
                <div>
                    <input v-model="displayJobsStatus.Closed_Lost" type="checkbox" @change="jobsDisplayUpdate">
                    Closed-Lost
                </div>
                <div>
                    <input v-model="displayJobsStatus.Closed_Expired" type="checkbox" @change="jobsDisplayUpdate">
                    Closed-Expired
                </div>
                <div>
                    <input v-model="displayJobsStatus.Closed_Lost_DoNotQualify" type="checkbox" @change="jobsDisplayUpdate">
                    Closed-Lost, do not qualify
                </div>
                <div>
                    <input v-model="displayJobsStatus.Closed_Timeout" type="checkbox" @change="jobsDisplayUpdate">
                    Closed-Timeout
                </div>
                <div>
                    <input v-model="displayJobsStatus.Closed_NotInterested" type="checkbox" @change="jobsDisplayUpdate">
                    Closed-Not interested
                </div>
            </div>
            <div class="jobsContainer">
                <p v-if="loading">Loading...</p>
                <p v-if="error">Error:: {{ error }}</p>
                <ul v-if="currentPageJobs">
                    <p>Displaying jobs {{ pageFirstJobIndex }}-{{ pageFirstJobIndex + perPage -1 }} / {{ totalJobsCount }}</p>
                    <li v-for="item in currentPageJobs" :key="item.id">
                        {{item.scrapStatus}} - 
                        <a :href="'/jobs/' + item._id" target="_blank" rel="noopener noreferrer">
                            {{ item.title }} <br> 
                            [{{item.company}}] <br>
                        </a>
                        
                        {{ item.country }}/{{ item.city }} <br>
                        #{{ item.tags }} <br>
                        ({{ item.contractType }}) <br>
                        Status: {{ item.status }} <br>
                        <div class="jobPostCardActions">
                            Update:
                            <button v-if="item.status==jobStatus.Null || item.status==jobStatus.New" @click="jobUpdateStatus(item._id, jobStatus.Open_ReferalStage)" >Open (Referal stage)</button>
                            <button v-if="item.status==jobStatus.Null || item.status==jobStatus.New" @click="jobUpdateStatus(item._id, jobStatus.Open_ReadyToApply)" >Open (Ready to apply)</button>
                            <button v-if="item.status==jobStatus.Null || item.status==jobStatus.New" @click="jobUpdateStatus(item._id, jobStatus.Closed_NotInterested)" >Closed (NotInterested)</button>
                            <button v-if="item.status==jobStatus.Open_ReferalStage || item.status==jobStatus.Open_ReadyToApply" @click="jobUpdateStatus(item._id, jobStatus.OnGoing_SelectedForApplication)" >OnGoing (Selected for application)</button>
                            <button v-if="item.status==jobStatus.OnGoing_SelectedForApplication" @click="jobUpdateStatus(item._id, jobStatus.OnGoing_Applied)" >OnGoing (Applied)</button>
                            <button v-if="item.status==jobStatus.OnGoing_Applied" @click="jobUpdateStatus(item._id, jobStatus.Closed_Lost)" >Closed (Lost)</button>
                            <button v-if="item.status==jobStatus.OnGoing_Applied" @click="jobUpdateStatus(item._id, jobStatus.Closed_Expired)" >Closed (Expired)</button>
                            <button v-if="item.status==jobStatus.OnGoing_Applied" @click="jobUpdateStatus(item._id, jobStatus.Closed_Lost_DoNotQualify)" >Closed (Do not qualify)</button>
                            <button v-if="item.status==jobStatus.OnGoing_Applied" @click="jobUpdateStatus(item._id, jobStatus.Closed_Timeout)" >Closed (Timeout)</button>
                        </div><br>
                        Date, (Last updated): {{ item.createdAt }} 
                        <span v-if="item.lastUpdated">, ({{ item.lastUpdated }})</span>
                        <span v-if="item.applicationDate">Applied on: {{ item.applicationDate }} <br></span>
                        
                    </li>
                </ul>
            </div>
        
        
        </div>

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
            totalJobsCount:null,
            pageFirstJobIndex:1,
            loading: false,
            error: null,
            displayJobsStatus: {
                Null: true,
                New: true,
                Open_ReferalStage: true,
                Open_ReadyToApply: true,
                OnGoing_SelectedForApplication: true,
                OnGoing_Applied: false,
                Closed_Lost: false,
                Closed_Expired: false,
                Closed_Lost_DoNotQualify: false,
                Closed_Timeout: false,
                Closed_NotInterested: false
            },
            jobStatus:{
                Null: null,
                New: "New",
                Open_ReferalStage: "Open_ReferalStage",
                Open_ReadyToApply: "Open_ReadyToApply",
                OnGoing_SelectedForApplication: "OnGoing_SelectedForApplication",
                OnGoing_Applied: "OnGoing_Applied",
                Closed_Lost:"Closed_Lost",
                Closed_Expired: "Closed_Expired",
                Closed_Lost_DoNotQualify: "Closed_Lost_DoNotQualify",
                Closed_Timeout: "Closed_Timeout",
                Closed_NotInterested: "Closed_NotInterested"
            }
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
                //const response = await axios.get(`${this.apiUrl}`,{
                //    params:{
                //        page: page,
                //        perPage: this.perPage,
                //    }
                //});
                //let payload = {
                //    status: this.displayJobsStatus
                //}
                let statusStr = [
                    ... this.displayJobsStatus.Null ? ["Null"] : [ ],
                    ... this.displayJobsStatus.New ? ["New"] : [ ],
                    ... this.displayJobsStatus.Open_ReferalStage ? ["Open_ReferalStage"] : [ ],
                    ... this.displayJobsStatus.Open_ReadyToApply ? ["Open_ReadyToApply"] : [ ],
                    ... this.displayJobsStatus.OnGoing_SelectedForApplication ? ["OnGoing_SelectedForApplication"] : [ ],
                    ... this.displayJobsStatus.OnGoing_Applied ? ["OnGoing_Applied"] : [ ],
                    ... this.displayJobsStatus.Closed_Lost ? ["Closed_Lost"] : [ ],
                    ... this.displayJobsStatus.Closed_Expired ? ["Closed_Expired"] : [ ],
                    ... this.displayJobsStatus.Closed_Lost_DoNotQualify ? ["Closed_Lost_DoNotQualify"] : [ ],
                    ... this.displayJobsStatus.Closed_Timeout ? ["Closed_Timeout"] : [ ],
                    ... this.displayJobsStatus.Closed_NotInterested ? ["Closed_NotInterested"] : [ ],
                ].join(",")
                const response = await axios({
                    url:`${this.apiUrl}`,
                    method: 'GET',
                    params:{
                        page: page,
                        perPage: this.perPage,
                        status: statusStr
                    },
                    //data: this.displayJobsStatus,
                });
                let data = response.data;
                if (data){
                    this.totalPages = Math.ceil(data.documents_count / data.perPage)
                    this.perPage = data.perPage
                    this.currentPageJobs = data.data
                    this.totalJobsCount = data.documents_count
                    this.pageFirstJobIndex = (this.currentPage -1) * this.perPage + 1
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
        },

        jobsDisplayNone(){
            //let displayjobsStatusOptions = structuredClone(this.displayJobsStatus)
            this.displayJobsStatus.Null = false,
            this.displayJobsStatus.New = false,
            this.displayJobsStatus.Open_ReferalStage = false,
            this.displayJobsStatus.Open_ReadyToApply = false,
            this.displayJobsStatus.OnGoing_SelectedForApplication = false,
            this.displayJobsStatus.OnGoing_Applied = false,
            this.displayJobsStatus.Closed_Lost = false,
            this.displayJobsStatus.Closed_Expired = false,
            this.displayJobsStatus.Closed_Lost_DoNotQualify = false,
            this.displayJobsStatus.Closed_Timeout = false,
            this.displayJobsStatus.Closed_NotInterested = false

            this.onPageChange(1)
        },

        jobsDisplayDefault(){
            this.displayJobsStatus.Null = true,
            this.displayJobsStatus.New = true,
            this.displayJobsStatus.Open_ReferalStage = true,
            this.displayJobsStatus.Open_ReadyToApply = true,
            this.displayJobsStatus.OnGoing_SelectedForApplication = true,
            this.displayJobsStatus.OnGoing_Applied = false,
            this.displayJobsStatus.Closed_Lost = false,
            this.displayJobsStatus.Closed_Expired = false,
            this.displayJobsStatus.Closed_Lost_DoNotQualify = false,
            this.displayJobsStatus.Closed_Timeout = false,
            this.displayJobsStatus.Closed_NotInterested = false
            
            this.onPageChange(1)
        },
        jobsDisplayUpdate(){
            this.onPageChange(1)
        },
        async jobUpdateStatus(jobId, status) {
            console.log("jobUpdateStatus - Start")
            
            let payload = {
                "status":status
            }
            console.log("updating the database object...")
            try {
                const response = await axios({
                    url:`${this.apiUrl}/${jobId}`,
                    method: 'PATCH',
                    data: payload,
                    
                    //{   Host: "http://192.168.1.99:3000",
                    //    Origin: "http://192.168.1.99:3000", }
                        //{//"Content-Type": 'application/x-www-form-urlencoded'}
                });
                //let data = response.data;
                //console.log("pouet")
                console.log(response)
                if (response.status == 200){
                    //this.jobData = data
                    console.log("Job status successfully updated")
                    this.onPageChange(this.currentPage)
                }
                
            } catch (err) {
                this.error = 'Failed to fetch data';
            } finally {
                this.loading = false;
            }
            console.log("jobUpdateStatus - End")
        }
	},

};
</script>

<style>
.jobStatusCheckboxContainer{
    height: fit-content;
    width: 15em;
    background-color: aquamarine;
    display: flex;
    flex-direction: column;
    align-items: start;
}
.dashboardContainer{
    height: fit-content;
    width: max-content;
    background-color: blanchedalmond;
    display: flex;
    flex-direction: row;
}
.jobStatusCheckboxButtons{
    display: flex;
    flex-direction: row;

}
.jobStatusCheckboxButton{
    background-color: grey;
    text-decoration-color: aqua;
    margin: 0.5em;
    cursor:pointer
}

.jobPostCardActions{
    display: flex;
    flex-direction: row;
}
.jobPostCardActions > * {
    margin-right: 1em;
}
.jobPostCardActions > *:first-child {
    margin-right: 1em;
    margin-left: 1em;
}
</style>