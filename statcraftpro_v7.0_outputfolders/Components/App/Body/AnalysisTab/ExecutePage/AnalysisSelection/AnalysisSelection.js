$(document).ready(function () {
  
  const $analysisTypeContainer = $("#AnalysisTypeContainer");
  const $AnalysisType = $("#AnalysisType");
  const $AnalysisTypesList = $("#AnalysisTypesList");

  const $analysisSubTypeContainer = $("#AnalysisSubTypeContainer");
  const $AnalysisSubType = $("#AnalysisSubType");
  const $AnalysisSubTypesList = $("#AnalysisSubTypesList");

  const AnalysisOptionContainer = $("#analysis-options-container");
  const AnalysisOptionWrapper = $("#analysis-options-wrapper");
  const AnalysisOptionHolder = $("#analysis-options-holder");
  const AnalysisOptionControl = $("#analysis-options-control");


  // Populate AnalysisType dropdown
  const AnalysisTypes = Object.keys(analysisData);

  generateAnalysisTypeList();
  generateAnalysisSubTypeList();
  generateAnalysisOptions();

  // Analysis Type 
  $analysisTypeContainer.click(function () {
    $AnalysisTypesList.toggle();
  });

  $(document).click(function (event) {
    if (!$(event.target).closest("#AnalysisTypeContainer, #AnalysisTypesList").length) {
      $AnalysisTypesList.hide();
    }
  });

  // Analysis Sub Type
  $analysisSubTypeContainer.click(function () {
    $AnalysisSubTypesList.toggle();
  });

  $(document).click(function (event) {
    if (!$(event.target).closest("#AnalysisSubTypeContainer, #AnalysisSubTypesList").length) {
      $AnalysisSubTypesList.hide();
    }
  });

  function generateAnalysisTypeList() {
    $AnalysisTypesList.empty();

    const currentAnalysisType = $AnalysisType.val();

    AnalysisTypes.forEach((AnalysisType) => {

      if (AnalysisType == currentAnalysisType) {
        return;
      }

      let displayname = AnalysisTypeNames[AnalysisType];

      let listitem = `<div class='analysistypelist_item' analysistypename ='${AnalysisType}'>${displayname}</div>`;

      $AnalysisTypesList.append(listitem);
    });
  }

  function generateAnalysisSubTypeList() {
    
    let AnalysisType = $AnalysisType.attr("activeanalysistype")
    let AnalysisSubTypes = Object.keys(analysisData[AnalysisType]);
    if (AnalysisSubTypes.length == 1 && AnalysisSubTypes[0] == "All") {
      $analysisSubTypeContainer.hide();
      return;
    }

    const currentAnalysisSubType = $AnalysisSubType.val();

    $AnalysisSubTypesList.empty();
    $AnalysisSubTypesList.attr("analysistype", AnalysisType);

    AnalysisSubTypes.forEach((AnalysisSubType) => {
      if (AnalysisSubType == currentAnalysisSubType) {
        return;
      }

      let displayname = AnalysisSubTypeNames[AnalysisSubType];

      let listitem = `<div class='analysissubtypelist_item' analysissubtypename ='${AnalysisSubType}'>${displayname}</div>`;

      $AnalysisSubTypesList.append(listitem);
    });
    $analysisSubTypeContainer.show();
    
  }
  
  $AnalysisTypesList.off("click").on("click", ".analysistypelist_item", function () {
    let analysistypename = $(this).attr("analysistypename");

    if ($AnalysisType.attr("activeanalysistype") == analysistypename) {
      return
    }

    $AnalysisType.val(AnalysisTypeNames[analysistypename]);
    $AnalysisType.attr("activeanalysistype", analysistypename);

    $AnalysisSubType.val("All");
    $AnalysisSubType.attr("activeanalysissubtype", "All");

    $AnalysisTypesList.toggle();
    generateAnalysisSubTypeList();
    generateAnalysisOptions();
    generateAnalysisTypeList();
  });

  $AnalysisSubTypesList.off("click").on("click", ".analysissubtypelist_item", function () {
    let analysissubtypename = $(this).attr("analysissubtypename");

    $AnalysisSubType.val(AnalysisSubTypeNames[analysissubtypename]);
    $AnalysisSubType.attr("activeanalysissubtype", analysissubtypename);

    $AnalysisSubTypesList.toggle();
    generateAnalysisOptions();
    generateAnalysisSubTypeList();
  });

  function generateAnalysisOptions() {
    let AnalysisType = $AnalysisType.attr("activeanalysistype")
    let AnalysisSubType = $AnalysisSubType.attr("activeanalysissubtype")
    let analysisnames = Object.keys(analysisData[AnalysisType][AnalysisSubType]);

    AnalysisOptionHolder.empty()

    analysisnames.forEach(analysisname=>{
      const analysisoption = getAnalysisElement(analysisname)

      AnalysisOptionHolder.append(analysisoption);

    })

  }

  function getAnalysisElement(analysisname) {
    // Create the main container div using jQuery
    const analysisOption = $('<div>', {
      class: 'analysis-option',
      analysisname: analysisname
    });
  
    // Create the icon container div
    const analysisIconCon = $('<div>', {
      class: 'analysis-icon-con'
    });
  
    // Create the icon image
    const analysisIcon = $('<img>', {
      class: 'analysis-icon',
      src: './Assets/Images/analysis_icons/dummy.svg',
      alt: ''
    });
  
    // Create the name container div
    const analysisNameCon = $('<div>', {
      class: 'analysis-name-con',
      text: AnalysisNames[analysisname]
    });
  
    // Append the icon image to the icon container div
    analysisIconCon.append(analysisIcon);
  
    // Append the icon container and name container to the main container div
    analysisOption.append(analysisIconCon, analysisNameCon);
  
    // Return the main container div
    return analysisOption;
  }


  AnalysisOptionHolder.off('click', '.analysis-option').on('click', '.analysis-option', function(event) {
    // Remove the 'active' class from all .analysis-option elements
    $('.analysis-option').removeClass('active');
    // Add the 'active' class to the clicked element
    $(this).addClass('active');

    const analysisselected = $(this).attr("analysisname")

    $('#analysis-name')
      .attr('activeanalysis',analysisselected)
      .text(AnalysisNames[analysisselected])
  });


  $('#analysis-options-control').click(function(){
    AnalysisOptionContainer.toggleClass('default expand')
    AnalysisOptionWrapper.toggleClass('default expand')
    AnalysisOptionHolder.toggleClass('default expand')
    AnalysisOptionHolder.scrollTop(0);
    AnalysisOptionControl.toggleClass('default expand')
  })

});
