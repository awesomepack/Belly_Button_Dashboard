// Belly_Button_Dashboard

// 1) Read in the samples.json data using D3

d3.json("samples.json").then(function(data){

    // Confirming the data was passed succesfully
    console.log(data);

// Static Bar Chart
    
    // Creating an Array to hold sample_values , otu_ids , otu_labels
    // Contains a list of sample arrays , withth first element being a header
    var data_array = [['values'],['ids'], ['labels']]

    // Iterating over the samples in the data and storing the top 10 otu data into arrays
    data.samples.forEach(element => {

        // Pushing sample_values into data array
        data_array[0].push(element.sample_values.slice(0,10));

        // Converting the otu labels into string
        var id_array = []; // stores the otu_id strings
        for (i = 0; i < element.otu_ids.slice(0,10).length; i++){
            
            id_array.push(element.otu_ids.slice(0,10)[i].toString());
        };
        // Pushing otu_id data into data array
        data_array[1].push(id_array);

        // Pushing label data into data array
        data_array[2].push(element.otu_labels.slice(0,10))

    
        


    });

    //Generating a static bar chart
    var static_bar = [{

        type: 'bar' ,
        x: data_array[0][1] ,
        y: data_array[1][1] ,
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

    console.log(data_array[1][1])
    console.log(data_array[0][1])

    





  

    

    

















});