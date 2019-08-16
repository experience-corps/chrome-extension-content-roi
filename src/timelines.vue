<template>
    <div> 
      <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/@mdi/font@3.x/css/materialdesignicons.min.css" rel="stylesheet">
      <v-app id="ab">
        <v-layout justify-center align-center>
          <v-btn
            color="primary"
            dark
            @click.stop="dialog = true">
            Open Dialog
          </v-btn> 

          <v-dialog
            v-model="dialog"
            fullscreen>
            <v-toolbar color= "deep-purple darken-4" dark> 
              <v-btn color = "deep-purple darken-4" @click='dialog = false'><v-icon>cancel</v-icon></v-btn>
              <h1>Opportunity Timelines for {{assetname}}</h1>
            </v-toolbar>
            <v-card  v-if = '!timelinesDataFilled'>
              <v-card-text>
                No data for this asset
              </v-card-text>
            </v-card>
            <v-tabs
              v-model="tab"
              background-color="deep-purple darken-2"
              class="elevation-2"
              dark
              grow
              show-arrows
              v-if = 'timelinesDataFilled'>   
              <v-tabs-slider></v-tabs-slider>
              <v-tab
                v-for="(timelineData, timeline) in timelinesData"
                :key="timeline"
                :href="`#tab-${timeline}`">
                {{timeline}}
              </v-tab>
         
              <v-tab-item
                v-for="(timelineData, timeline) in timelinesData"
                :key="timeline"
                :value="'tab-' + timeline">
                <v-card
                  flat tile>
                  <v-card-text>
                    <fusioncharts
                      :type="timelineData['type']"
                      :width="timelineData['width']"
                      :height="timelineData['height']"
                      :dataFormat="timelineData['dataFormat']"
                      :dataSource="timelineData['dataSource']">
                    </fusioncharts>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-dialog>  
        </v-layout>
      </v-app>
    </div> 
</template>

<script>
import axios from 'axios'
export default{
    props() {
      return {
        assetname: ""
      }
    },
    data(){
      return {
        dialog: false,
        timelinesData: {},
        timelinesDataFilled: false    
      }   
    }, 
    mounted(){
      // this.getChartData()
      this.createAssetTimelines(require('./data.json'));
    },
    methods :{
      getChartData(){
        axios.get("https://christso517.com:8443/api/assets`", {
          params : {
              asset : "Showpad for Manufacturing One Pager.pdf"
          }
        }, {crossdomain:true}
        )
        .then((data) => {
          console.log('RECEIVED', data);
          this.createAssetTimelines(data.data)
        })
        .catch((err)=> {
          console.log(err)
        })
      }, 
      createAssetTimelines(dataOne){
        for(var opp in dataOne){
             this.timelinesData[opp] = {
                 "type" : 'gantt',
                 "width" : "100%", 
                 "height" : "600", 
                 "dataFormat" : 'json',
                 "dataSource" : {
                     "chart": {
                     "dateformat": "mm/dd/yyyy", 
                     "showTaskLabels": "1", 
                     "slackFillColor": "#e44a00",
                     "taskBarFillMix": "light+0", 
                     "taskBarRoundRadius": "10",
                     "hoverBandColor" : "#327ba8",
                     "hoverBandAlpha": "40"
                     }, 
                     "categories" : [
      
                     ], 
                     "processes" : {
                         "fontsize": "10",
                         "isbold": "1",
                         "align": "left", 
                         "headertext": 'Stages', 
                         "headeralign": 'left',
                         'headervalign':'bottom',
                         "headerFontSize": "14", 
                         "headerIsUnderline": "1", 
                         "bgColor": "#036ffc", 
                         "fontColor": "#ffffff", 
                         "headerBgColor": "#036ffc", 
                         "headerFontColor": "#ffffff"
                     }, 
                     "tasks" : {
                         "color": "#036ffc",
                     }, 
                     "datatable":{
                         "fontsize": "10",
                         "align": "center",
                         "headeralign": "center",
                         'headervalign':'bottom',
                         "headerfontsize": "12",
                         "datacolumn" : '[]', 
                         "headerIsUnderline": "1", 
                         "bgColor": "#036ffc", 
                         "fontColor": "#ffffff", 
                         "headerBgColor": "#036ffc", 
                         "headerFontColor": "#ffffff"
                     } 
                 }
              }
            this.timelinesData[opp]['dataSource']['processes']['process'] = dataOne[opp]['processes']
            this.timelinesData[opp]['dataSource']['tasks']['task'] = dataOne[opp]['tasks'];
            this.timelinesData[opp]['dataSource']['categories'].push({"fontColor": "#ffffff", "bgColor": "#036ffc", 'category' : dataOne[opp]['quarterCategory']});
            this.timelinesData[opp]['dataSource']['categories'].push({"fontColor": "#ffffff", "bgColor": "#036ffc",'category' : dataOne[opp]['monthCategory']});
            this.timelinesData[opp]['dataSource']['datatable']['datacolumn'] = [{"headerFontColor": "#ffffff", "fontColor": "#ffffff", "headerBgColor": "#036ffc", "headertext": "Start Date", 'text' : dataOne[opp]['startsColumn'], "isBold": "1"}, 
               {"headertext": "End Date", 'text' : dataOne[opp]['endColumn'], "isBold": "1"}];
            }  
        if((Object.keys(this.timelinesData)).length !== 0){
          this.timelinesDataFilled = true;
        }
        console.log(this.timelinesData)
      },
    }
}
</script>

<style scoped>
#ab {
  background: none;
  height: auto;
  width: auto;
  margin-right: 5px;
}
</style>