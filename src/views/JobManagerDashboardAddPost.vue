<template>
    <div>
        <h1>Dashboard - Add a new job</h1>
        <span v-if="newJobData">
            New Job added: {{ newJobData.id }}<br>
            {{ newJobData.company }} - {{ newJobData.title }} <br>
        </span>
        <span v-if="error">
            Error: {{ error }}<br>
        </span>
        <div class="formContainer">
            <form @submit.prevent="postJob">
                <div class="formItemsContainer">
                    <p>Add job</p>
                    <div class="formRow"> <input v-model="jobData.title" type="text" required placeholder="Job Title*" ></div>
                    <div class="formRow"> <input v-model="jobData.company" type="text" required placeholder="Company*" > <input v-model="jobData.motherCompany" type="text" placeholder="Mother company" ></div>

                    <div class="formRow"> <input v-model="jobData.url" type="text" required placeholder="Job url*" ></div>
                    <div class="formRow"> <input v-model="jobData.applyUrl" type="text" placeholder="Job apply url" ></div>

                    <div class="formRow"> <input v-model="jobData.contractType" type="text" required placeholder="Job contract type.* Ex: fulltime, temporary, freelance, partTime, internship, apprenticeship" ></div>
        
                    <div class="formRow"> <input v-model="jobData.country" type="text" required placeholder="Country*" ></div>
                    <div class="formRow"> <input v-model="jobData.district" type="text" placeholder="Disctrict" ></div>
                    <div class="formRow"> <input v-model="jobData.city" type="text" required placeholder="City*" > <input v-model="jobData.zipCode" type="text" placeholder="Zip code" ></div>

                    <div class="formRow"> <input v-model="jobData.tags" type="text" required placeholder="Tags* Ex: 'python,kotlin'" ></div>
        
                    <textarea v-model="jobData.description" rows="25" cols="100" placeholder="Job Description"></textarea>
        
                    <div class="formRow"> Source type: <br> <input v-model="jobData.sourceType" type="text" required placeholder="ex:'jobBoard'*" ></div>
                    <div class="formRow"> <input v-model="jobData.platform" type="text" required placeholder="Platform* (ex: fr.indeed.com)" ></div>
                    <button type="submit">Add job</button>
                </div>
            </form>
        </div>
  </div>
</template>
  
<script>
//import  ProductComponent  from './components/ProductComponent.vue';
import axios from "axios";
//import api_url from "/src/main.js";

export default {
    name: "JobManagerDashboard", // useful for debugging purposes
    components: {
        // declared child components
        // Components that can be used in the template
        //ProductComponent,
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
            apiUrl: process.env.VUE_APP_JOB_MANAGER_API,
            loading: false,
            error: null,
            jobData:{
                "title": "Full stack developer",
                "sourceType": "jobBoard",
                'platform': 'fr.indeed.com',
                'criterias': null,
                'url': 'www.myJobPostingSite.com/jobs/1',
                'applyUrl': null,
                'slug': 'weiurwuy',
                'motherCompany': 'Google',
                'company': 'Google France',
                'country': 'France',
                'district': null,
                'city': 'Paris',
                'zipCode': null,
                'skills': null,
                'description': null,
                'scrapStatus': 'new',
                'status': null,
                'applicationDate': null,
                'timeoutDate': null,
                'createdOn': '2024-07-13',
                'createdAt': '2024-07-13T11:35:54',
                'lastUpdated': null,
                "tags": "askell,lolcode",
                'qualificationsRequired': null,
                'qualificationsPrefered': null,
                'contractType': 'fulltime',
                'structuredData': null
            },
            newJobData: {
                id:"234ui2y398akjshd91",
                title: "Full stack developer",
                company: "MeCorp"
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
	// beforeCreate() {
    //     console.log("JobManagerDashboard - beforeCreate");
    //     },
	// created() {
    //     console.log("JobManagerDashboard - created");
    // },
	beforeMount() {
        console.log("JobManagerDashboardAddPost - beforeMount");
    },
	mounted() {
        console.log("JobManagerDashboardAddPost - mounted");
        this.newJobData = null
        this.initForm()
        // console.log("fetching jobs from the jobs API...");
        // this.fetchJobsPage(1)
    },
	// beforeUpdate() {
    //     console.log("JobManagerDashboard - beforeUpdate");
    // },
	// updated() {
    //     console.log("JobManagerDashboard - updated");
    // },
	// activated() {
    //     console.log("JobManagerDashboard - activated");
    // },
	// deactivated() {
    //     console.log("JobManagerDashboard - deactivated");
    // },
	
	
    // beforeUnmount() {
    //     console.log("JobManagerDashboard - beforeUnmount");
    // }, // beforeDestroy with Vue 2
	// unmounted() {
    //     console.log("JobManagerDashboard - unmounted");
    // }, // destroyed with Vue 2
    errorCaptured() {},

	methods:{  // component own methods
		//setFirstName() {  
		//  this.firstName='Joe'  
		//}
        initForm() {
            this.jobData.title = null
            this.jobData.motherCompany = null
            this.jobData.company = null
            this.jobData.url = null
            this.jobData.applyUrl = null
            this.jobData.country = null
            this.jobData.district = null
            this.jobData.city = null
            this.jobData.zipCode = null
            this.jobData.description = null
            this.jobData.contractType = "fulltime"
            this.jobData.tags = null
        },
        resetForm() {
            this.jobData.title = null
            this.jobData.motherCompany = null
            this.jobData.company = null
            this.jobData.url = null
            this.jobData.applyUrl = null
            this.jobData.country = null
            this.jobData.district = null
            this.jobData.city = null
            this.jobData.zipCode = null
            this.jobData.description = null
            this.contractType = "fulltime"
            //this.jobData.tags = null
        },
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
        },
        async postJob() {
            console.log("postJob - Start")
            console.log("apiUrl:", this.apiUrl)
            console.log(process.env.VUE_APP_JOB_MANAGER_API)
            this.error = null
            this.jobData.applyUrl = this.jobData.applyUrl ? this.jobData.applyUrl : this.jobData.url
            
            //let postUrl = this.jobData.url
            //console.log('Url: ' , postUrl)
            //console.log('jobData: ' , this.jobData)
            let urlParts = this.jobData.url.split("/")
            this.jobData.slug = urlParts[urlParts.length -1]
            this.jobData.motherCompany = this.jobData.motherCompany ? this.jobData.motherCompany : this.jobData.company

            let m = new Date();
            const timezoneShift = 2;
            let createdAt =
                m.getUTCFullYear() + "-" +
                ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +
                ("0" + m.getUTCDate()).slice(-2) 
                + "T" + 
                ("0" + m.getUTCHours() + timezoneShift).slice(-2) + ":" +
                ("0" + m.getUTCMinutes()).slice(-2) + ":" +
                ("0" + m.getUTCSeconds()).slice(-2);
            this.jobData.createdAt = createdAt

            let createdOn =
                m.getUTCFullYear() + "-" +
                ("0" + (m.getUTCMonth()+1)).slice(-2) + "-" +
                ("0" + m.getUTCDate()).slice(-2);
            this.jobData.createdOn = createdOn

            //let genericJobType

            //this.contractType = 
            let tags = this.jobData.tags.split(",")

            let payload = {
                "title": this.jobData.title,
                "sourceType": this.jobData.sourceType,
                "platform": this.jobData.platform,
                "criterias": {},
                "url": this.jobData.url,
                "applyUrl": this.jobData.applyUrl,
                "slug": this.jobData.slug,
                "company": this.jobData.company,
                "motherCompany": this.jobData.motherCompany,
                "country": this.jobData.country,
                "district": this.jobData.district,
                "city": this.jobData.city,
                "zipCode": this.jobData.zipCode,
                "contractType": this.jobData.contractType,
                "skills": null,
                "description": this.jobData.description,
                "scrapStatus": this.jobData.scrapStatus,
                "status": null,
                "applicationDate": null,
                "timeoutDate": null,
                "createdAt": this.jobData.createdAt,
                "createdOn": this.jobData.createdOn,
                "lastUpdated": null,
                "tags": tags,
                "qualificationsRequired": null,
                "qualificationsPreferred": null,
                "structuredData": null
            }

            console.log("Creating job in database...")
            try {
                const response = await axios({
                    url:`${this.apiUrl}`,
                    method: 'POST',
                    data: payload,
                    
                    //{   Host: "http://192.168.1.99:3000",
                    //    Origin: "http://192.168.1.99:3000", }
                        //{//"Content-Type": 'application/x-www-form-urlencoded'}
                });
                let data = response.data;
                //console.log("pouet")
                console.log(response)
                if (response.status == 201){
                    //this.jobData = data
                    console.log("Job successfully created")
                    this.newJobData = {
                        id:data['_id'],
                        title: data['title'],
                        company: data['company']
                    }
                    setTimeout(function(){
                        this.newJobData = null
                    }, 3000)

                    this.resetForm()
                } else {
                    console.log('Error, response: ', response)
                    this.newJobData = null
                    this.error = response
                }
                
            } catch (err) {
                this.error = 'Failed to post job';
            } finally {
                this.loading = false;
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log("postJob - End")
        }
	},

};
</script>

<style>
    .formItemsContainer{
        width:40vw;
        height: fit-content;
        //background-color: rgb(156, 246, 12);
        display: flex;
        flex-direction: column;
    }
    .formRow{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
        align-items: center;
        //background-color: aquamarine;
        padding-top: 0.25em;
        padding-bottom: 0.2em;
        margin: 0.25em
    }
    input{
        flex: 1;
    }
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