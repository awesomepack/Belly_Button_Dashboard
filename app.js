// Belly_Button_Dashboard

// 1) Read in the samples.json data using D3

d3.json("samples.json").then(function(data){

    
    console.log(data); // logging data to console
    
    // Array to hold patient_id,sample_values , otu_ids , 'labels'
    var data_array = [['patient_id'],['values'],['ids'], ['labels']];

    // Iterating over the samples in the data and storing the top 10 otu data into arrays
    data.samples.forEach(element => {

        data_array[0].push(element.id); // Pushing patient id

        // Pushing sample_values into data array
        data_array[1].push(element.sample_values);

        // Converting the otu labels into string
        var id_array = []; // stores the otu_id strings
        for (i = 0; i < element.otu_ids.length; i++){
            
            id_array.push(element.otu_ids[i].toString());
        };
        // Pushing otu_id data into data array
        data_array[2].push(id_array);

        // Pushing label data into data array
        data_array[3].push(element.otu_labels)

    
        


     });

    // The default bar chart
    var static_bar = [{

        type: 'bar' ,
        x: data_array[1][1].slice(0,10) ,
        y: data_array[2][1].slice(0,10).map(x => "OTU" + x) ,
        orientation: 'h'

    }];

    Plotly.newPlot('bar', static_bar, {
        title: 'Top 10 OTU/Sample',
        xaxis: {
          title: 'OTU Count'
        },
        yaxis: {
          title: 'OTU ID',
          dtick: 1
        },
        margin: {
          l: 200
        }
      })

    //console.log(data_array[0][1])
    //console.log()



  // update plotly function
function updatePlotly(newdata){
  Plotly.restyle("bar" , "values" , [newdata])
}   

// Defining the updateGraph function
function updateGraph(){

  var dropdownMenu = d3.select("#selDataset");

  // Assign the dropdown value to a variable
  var sample = dropdownMenu.property("value")

  // initializing data array
  var data = [];

  // switching data based on dropdown value
  if (sample == 'sample1'){
    data = data_array[0][1]
  }

  else if (sample == 'sample2'){
    data = data_array[0][2]
  }

  // calling function to update chart
  updatePlotly(data);

}

  // Calling the updateGraph function when the selector is changed
  d3.selectAll("#selDataset").on("change" , updateGraph);
 





  

    

    

















});