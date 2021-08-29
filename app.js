// Belly_Button_Dashboard

// 1) Read in the samples.json data using D3

d3.json("samples.json").then(function(data){

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

     // pushing metadata into data array
     data_array.push(data.metadata)

// < End Data storing >

// generating default graphs
init(data_array[1][1],data_array[2][1], data_array[3][1] , data_array[4][0])


// Populating the select div with options
for (i = 1; i < data_array[0].length;i++){

  var new_option = d3.select('select').append('option');
  new_option.text(data_array[0][i]) // sample_id as text
  new_option.attr('value' , data_array[0][i]) // sample_id as value

}

// call the optionChanged() function when DOM is altered
d3.select('#selDataset').on('change' , optionChanged(data_array))

console.log(d3.select('#selDataset').property('value')) // identifies the current value of selection

});
// < End Scope of Data >


// < Begin function init() >
function init(xData , yData , lData , mData){

  // Default bar chart
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

  // Default Bubble chart
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

  // Default Meta Data

  // Iterate over the metadata of the first sample and create a new list
  // of the key and value pairs
  for (i = 0; i < 7; i++){

    var new_li = d3.select('ul').append('li');
    new_li.text(Object.entries(mData)[i])
  }

};
// < End function init >


// Defining the optionChanged() function called during a DOM change
// Need to figure out how to call within the scope of the data
// or how to pass data when event occurs

// < Begin optionChanged >
function optionChanged(dataset){
  console.log('A Changed occurred');

  var dropDown = d3.select('#selDataset');
  var curr_value = dropDown.property('value');

  // Compare the value of curr_value to our patient_id
  //if a match occurs update with the samples data
  for (i = 1; i < dataset[0].length;i++){

    if (curr_value == dataset[0][i]){
      
      xData = dataset[1][i];
      yData = dataset[2][i];
      lData = dataset[3][i];
      mData = dataset[4][i+1];
    }

  }
  // console.log(curr_value)
  // console.log(xData)
  // console.log(yData)

  // Restyling bar
  Plotly.restyle('bar' , 'x' , [xData.slice(0,10)]);
  Plotly.restyle('bar' , 'y' , [yData.slice(0,10).map(otu => 'otu' + otu)]);

  // Restyling bubble
  Plotly.restyle('bubble' , 'x' , [xData]);
  Plotly.restyle('bubble' , 'y' , [yData]);
  Plotly.restyle('bubble' , 'size' , [xData]);
  Plotly.restyle('bubble' , 'color' , [yData]);

  // Updating the metadata
  

  




 }
// < End optionChanged >
