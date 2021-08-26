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

        data_array[0].push(element.sample_values.slice(0,10));

        // Converting the otu labels into string
        var id_array = []; // stores the otu_id strings
        for (i = 0; i < element.otu_ids.slice(0,10).length; i++){
            
            id_array.push(element.otu_ids.slice(0,10)[i].toString());
        };

        data_array[1].push(id_array);

        data_array[2].push(element.otu_labels.slice(0,10))

    
        console.log(data_array);


    });

    //for (var i = 0; i < data_array[1][1].length; i++){
      //  data_array[1][1][i] = data_array[1][1][i].toString();
    //}

    //test_arr[0].push([1,2,3,4,5,6,7,8,9,10]);

    //for( var i = 0; i < test_arr[0][1].length; i++){
    //    test_arr[0][1][i] = test_arr[0][1][i].toString()
    //}






  

    

    

















});