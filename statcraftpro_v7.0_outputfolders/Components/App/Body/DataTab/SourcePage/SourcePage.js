$(document).ready(function () {
    loadEmptyGrid();
  
    // Controllbar Functionalities And Events
  
    $("#datatab-sourceselection-searchbar").on("keyup", function () {
      $("#datatab-sourcelist-container").show();
      let searchtext = $(this).val().toLowerCase();
  
      let matchingsourcenamelist = sourcenamelist.filter(function (sourcename) {
        return sourcename.toLowerCase().includes(searchtext);
      });
  
      setTimeout(function () {
        generateSourceNameList(matchingsourcenamelist);
      }, 100);
    });
  
    $("#datatab-sourceselection-searchbar")
      .off("click")
      .on("click", function () {
        if ($(this).val() === "select source") {
          $(this).val("");
          $(this).attr("activesource", "select source");
        }
      })
      .on("blur", function () {
        if ($(this).val() === "") {
          $(this).val("select source");
          $(this).attr("activesource", "select source");
        } else if ($(this).val() !== $(this).attr("activesource")) {
          $(this).val($(this).attr("activesource"));
        }
      });
  
    // Dropdown Selection
    $("#datatab-sourcelist-container, #analysistab-sourcelist-container")
      .off("click")
      .on("click", ".datasourcelist_item", function () {
        let sourcename = $(this).attr("sourcename");
        $("#datatab-sourceselection-searchbar").val(sourcename);
        $("#datatab-sourceselection-searchbar").attr("activesource", sourcename);

        $("#analysistab-sourceselection-searchbar").val(sourcename);
        $("#analysistab-sourceselection-searchbar").attr("activesource", sourcename);

        $("#view_controls").show();
        $("#datatab-sourcelist-container").toggle();
        $("#analysistab-sourcelist-container").toggle();
  
        resetViewControls();
        if (sourcename == "select source") {
          showContainer("#sourcelist");
        } else {
          $(document).trigger("newsourceselected");
        }
      });
  
    $("#datatab-sourcelist-dropdown").click(function () {
      generateSourceNameList(sourcenamelist);
      $("#datatab-sourcelist-container").toggle();
    });
  
    // Hide the selection list if clicked outside
    $(document).click(function (event) {
      if (!$(event.target).closest("#datatab-sourcelist-dropdown, #datatab-sourcelist-container").length) {
        $("#datatab-sourcelist-container").hide();
      }
    });
  
  
    // Switching Between Views
  
    $(document).on("click", "#sourcedata-tab", function () {
      showContainer("#datagrid");
      if (loadSourceData() == false) {
        showErrorSplash("Failed to fetch data");
        // showInfo(infoMessages);
        showContainer("#sourcelist");
      }
    });
  
    $(document).on("click", "#metadata-tab", function () {
      showContainer("#metadata");
      if (loadMetaData() == false) {
        showContainer("#sourcelist");
      }
    });
  
    $(document).on("click", "#filters-tab", function () {
      showContainer("#filters");
      if (loadFilters() == false) {
        showContainer("#sourcelist");
      }
    });
  
    // Functionality To Move The Clicked Button As Active Button
    $(document).on("click", ".viewtabcontrol", function () {
      var $activeview = $("#activeview");
      var $viewslist = $("#viewslist");
  
      if ($(this).parent().attr("id") === "activeview") {
        return;
      }
  
      var $currentActiveTab = $activeview.children(".viewtabcontrol");
      if ($currentActiveTab.length > 0) {
        $currentActiveTab.appendTo($viewslist);
      }
  
      var clickedId = $(this).attr("id");
      var $clickedElement = $("#" + clickedId);
      var $firstElementInList = $viewslist.children().first();
  
      if ($clickedElement.is($firstElementInList)) {
        $clickedElement.appendTo($activeview);
      } else {
        if ($viewslist.children().eq(1).is($clickedElement)) {
          $firstElementInList.appendTo($viewslist);
        }
        $clickedElement.appendTo($activeview);
      }
    });
  
  
  
  //   const infoMessages = [
  //     "This is an info message",
  //     "With multiple lines",
  //     "And more information",
  //     "This is an info message",
  //     "With multiple lines",
  //     "And more information",
  //     "This is an info message",
  //     "With multiple lines",
  //     "And more information",
  //   ];
  
  //   const errorMessages = ["This is an error message", "With multiple lines", "And more information", "Stack Trace: at com.example.Main.main(Main.java:14)"];
  
  
    generateSourceNameList(sourcenamelist);
  
    function showContainer(selectedId) {
      const containers = ["#emptygrid", "#sourcelist", "#datagrid", "#metadata", "#filters"];
      containers.forEach(function (containerId) {
        if (containerId === selectedId) {
          if (containerId === "#emptygrid") {
            resetApplicationViewControllBar();
          }
          if (containerId === "#sourcelist") {
            resetApplicationViewControllBar();
            loadsourcelist();
          }
          $(containerId).show();
        } else {
          $(containerId).hide();
        }
      });
    }
  
    function resetApplicationViewControllBar() {
      $("#datatab-sourceselection-searchbar").val("select source");
      $("#datatab-sourceselection-searchbar").attr("activesource", "select source");

      $("#analysistab-sourceselection-searchbar").val("select source");
      $("#analysistab-sourceselection-searchbar").attr("activesource", "select source");

      $("#view_controls").hide();
    }
  
    function resetViewControls() {
      var $activeview = $("#activeview");
      var $viewslist = $("#viewslist");
  
      var $sourcedataTabButton = $("#sourcedata-tab");
      var $metadataTabButton = $("#metadata-tab");
      var $filtersTabButton = $("#filters-tab");
  
      $activeview.empty();
      $viewslist.empty();
  
      $activeview.append($sourcedataTabButton);
      $viewslist.append($metadataTabButton);
      $viewslist.append($filtersTabButton);
    }
  
    $(document).on("newsourceselected", function () {
      $("#sourcedata-tab").click();
    });
  
    // $("#sourcedata-tab").trigger("click");
    showContainer("#sourcelist");
  });
  

  function generateSourceNameList(sourcenamelist) {
      
    const listcontainerDataTab = $("#datatab-sourcelist-container");
    const listcontainerAnalysisTab = $("#analysistab-sourcelist-container");

    let selectedsource = $("#datatab-sourceselection-searchbar").val();

    listcontainerDataTab.empty();
    listcontainerAnalysisTab.empty();

    sourcenamelist.forEach((sourcename) => {
      if (sourcename == selectedsource) {
        return;
      }

      let listitem = `<div class='datasourcelist_item' sourcename='${sourcename}'>${sourcename}</div>`;
      listcontainerDataTab.append(listitem);
      listcontainerAnalysisTab.append(listitem);
    });
  }