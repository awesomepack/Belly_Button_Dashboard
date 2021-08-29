// Belly_Button_Dashboard

// 1) Read in the samples.json data using D3

d3.json("samples.json").then(function(data){

    
    console.log(data);


// < Begin Data storing  >  

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
// < End Data storing >

// generating default graphs
init(data_array[1][1],data_array[2][1], data_array[3][1])


});
// < End Scope of Data >


// < Begin function init() >
function init(xData , yData , lData){

  // default bar chart
  var bar_data = [{
    x: xData.slice(0,10)  , 
    y: yData.slice(0,10).map(otu => 'OTU: ' + otu),
    type: 'bar' ,
    orientation: 'h'
  }];

  var bar_layout = {
    title: 'Top Ten OTUs'
  };

  Plotly.newPlot('bar' , bar_data , bar_layout);

  // Bubble chart
  var bubble_data = [{
    x: yData , 
    y: xData ,
    text: lData ,
    mode: 'markers' ,
    marker:{
      size: xData ,
      color: yData
    }
    
  }]

  Plotly.newPlot('bubble' , bubble_data)


};
// < End function init >




// Event listener for the dropdown menu
//d3.selectAll('#selDataset').on('change' , optionChanged());

// Defining the getData() function called during a DOM change
// < Begin optionChanged >
// function optionChanged(){

//   var dropdownMenu = d3.select('#selDataset');

//   var dataset = dropdownMenu.property('value');

//   var value_data = [];

//   if (dataset == 'data1'){
//     value_data = data_array[1][1].slice(0,10);
//   }
//   else if (dataset == 'data2'){
//     value_data = data_array[1][2].slice(0,10);
//   }
  
    





// }
// < End optionChanged >






//init()
