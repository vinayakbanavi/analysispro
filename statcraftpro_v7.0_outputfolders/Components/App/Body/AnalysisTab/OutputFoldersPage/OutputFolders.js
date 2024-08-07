var breadcrumbs = ["Output Folders"]

$(document).ready(function(){

    const FolderTracker = $('#folder-tracker')
    const FolderControls = $('#folder-controls')
    const OutputFolderTabs = $('.folder-tab')
    const OutputFoldersContainer = $('#output-folders-container')
    const OutputFoldersHeader = $('#folderlist-header')
    const OutputFiles = $('#output-files-container')
    const OutputWindow = $('#output-display-container')
    const ViewStyle =  $('#changeview');

    
    renderFolderTracker();
    renderOutputFolders();

    ViewStyle.click(function() {

        var activestyle = ViewStyle.attr('activestyle');
        

        if(activestyle == "grid")
        {
            ViewStyle.attr('activestyle', "list");
            ViewStyle.find('img').attr('src', './Assets/Images/output_folders/controls/view_grid_gray.svg');
            ViewStyle.attr('title', 'view grid');
        }
        else{
            ViewStyle.attr('activestyle', "grid");
            ViewStyle.find('img').attr('src', './Assets/Images/output_folders/controls/view_list_gray.svg');
            ViewStyle.attr('title', 'view list');
        }


        if(breadcrumbs.length == 1)
        {
            // if length is 1, it means user is in output folders tab
            renderOutputFolders();
        }
        else if (breadcrumbs.length ==2)
        {
            // if length is 2, it means user is in output files tab of a corresponding folder
            renderOutputFiles();
        }

    });


    OutputFoldersContainer.on('click', '.folder', function() {

        let clickedfolder = $(this).attr('foldername')

        if(breadcrumbs[breadcrumbs.length - 1] == clickedfolder)
        {
            return
        }

        if(breadcrumbs.length > 1)(
            breadcrumbs.pop()
        )
        
        breadcrumbs.push(clickedfolder)

        renderFolderTracker();

        renderOutputFiles();

        OutputFolderTabs.hide();
        OutputFiles.show();
    });

    OutputFiles.on('click', '.output-file', function() {
        FolderControls.slideUp()

        let clickedoutput = $(this).attr('outputname')

        if(breadcrumbs[breadcrumbs.length - 1] == clickedoutput)
        {
            return
        }

        if(breadcrumbs.length > 2)(
            breadcrumbs.pop()
        )
        
        breadcrumbs.push(clickedoutput)

        renderFolderTracker();

//      renderAnalysisOutput(clickedoutput);

        OutputFolderTabs.hide();
        OutputWindow.show();
    });


    FolderTracker.on('click', '.breadcrumb', function() {

        let clickedbreadcrumb = $(this).attr("breadcrumb")

        if(breadcrumbs[breadcrumbs.length - 1] == clickedbreadcrumb)
        {
            return;
        }

        else if(breadcrumbs[0] == clickedbreadcrumb)
        {
            // first level is always root folders
            FolderControls.slideDown() 
            breadcrumbs.splice(1);
            renderOutputFolders();
            OutputFolderTabs.hide();
            OutputFoldersContainer.show();
        }
        else if(breadcrumbs[1] == clickedbreadcrumb)
        {
            // second level is always files
            FolderControls.slideDown() 
            breadcrumbs.splice(2);
            renderOutputFolders();
            OutputFolderTabs.hide();
            OutputFiles.show();
        }
        else if(breadcrumbs[2] == clickedbreadcrumb)
        {
            // third level is always output window
            breadcrumbs.splice(3);
            renderOutputFolders();
            OutputFolderTabs.hide();
            OutputWindow.show();
        }

        renderFolderTracker();

    });

})

function getOutputFoldersData(activeViewStyle)
{
    let data

    if(activeViewStyle == "grid")
    {
        data = foldersData1.map(folder => folder.foldername);
    }
    else
    {
        data = foldersData1.map(folder => ({
            foldername: folder.foldername,
            folderdescription: folder.folderdescription,
            created: folder.created,
            modified: folder.modified,
            size: folder.size
        }));
    }

    return data;
}

function renderOutputFolders()
{

    const foldersWrapper = $('#output-folders-container');
    const OutputFoldersHeader = $('#folderlist-header');
    foldersWrapper.empty();

    const activeViewStyle = $('#changeview').attr('activestyle');

    const foldersdata = getOutputFoldersData(activeViewStyle);

    if (activeViewStyle == "grid")
    {
        OutputFoldersHeader.slideUp()

        foldersdata.forEach(folder => {
            const folderBox = generateFolderElementForGridView(folder);
            foldersWrapper.append(folderBox);
        })
    }
    else{

        OutputFoldersHeader.slideDown()
        
        foldersdata.forEach(folder => {
             const folderBox = generateFolderElementForListView(folder);
             foldersWrapper.append(folderBox);
        })
    }
}

function generateFolderElementForGridView(folder_name)
{

    const folder = $('<div class="folder folderbox"></div>');
    folder.attr('foldername', folder_name)

    const imagecontainer = $('<div class="folderbox-image-container"></div>')

    const imagepath = './Assets/Images/output_folders/filesystemicons/filled/folder_filled.svg'

    const image = $('<img>')
    image
        .addClass('folderbox-image')
        .attr('src',imagepath)
        .attr('alt', "folder image")

    imagecontainer.append(image);

    const labelcontainer = $('<div class="folderbox-label-container"></div>')
    
    const label = $('<p></p>')
    label
        .addClass('folderbox-name')
        .text(folder_name)

    labelcontainer.append(label)

    folder.append(imagecontainer, labelcontainer)

    return folder;
}

function generateFolderElementForListView(folder) {
    // Create the main folder div
    var folderDiv = $('<div>', { class: 'folder folderlist', foldername: folder.foldername });

    const imagepath = './Assets/Images/output_folders/filesystemicons/filled/folder_filled.svg';

    // Create the folder image container
    var folderImageContainer = $('<div>', { class: 'folder-image-container' });
    var folderImage = $('<img>', { 
        class: 'folder-image', 
        src: imagepath, 
        alt: '' 
    });
    folderImageContainer.append(folderImage);

    // Create the static folder details
    var folderDetailsStatic = $('<div>', { class: 'folder-details-static' });
    var folderName = $('<div>', { class: 'folder-name', text: folder.foldername });
    var folderCreated = $('<div>', { class: 'folder-created', text: 'Created: ' + folder.created });

    // Check if the folder description is empty
    if (folder.folderdescription) {
        var folderDescription = $('<div>', { class: 'folder-description', text: folder.folderdescription });
        folderDetailsStatic.append(folderName, folderDescription, folderCreated);
    } else {
        var emptyDiv = $('<div>', { class: 'empty' });
        folderDetailsStatic.append(emptyDiv, folderName, folderCreated);
    }

    // Create the dynamic folder details
    var folderDetailsDynamic = $('<div>', { class: 'folder-details-dynamic' });
    var emptyDivDynamic = $('<div>', { class: 'empty' });
    var folderSize = $('<div>', { class: 'folder-size', text: folder.size });
    var folderModified = $('<div>', { class: 'folder-modified', text: 'Modified: ' + folder.modified });
    folderDetailsDynamic.append(emptyDivDynamic, folderSize, folderModified);

    // Append all parts to the main folder div
    folderDiv.append(folderImageContainer, folderDetailsStatic, folderDetailsDynamic);

    return folderDiv;
}

function getOutputFilesData(folder_name, activeViewStyle)
{

    let data

    let outputfilesdata = outputsData1[folder_name];

    if(activeViewStyle == "grid")
    {
        data = outputfilesdata.map(item => ({
            title: item.title,
            outputid: item.outputid
        }));
    }
    else
    {
        data = outputfilesdata.map(folder => ({
            title: folder.title,
            analysisname: folder.analysisname,
            dataset: folder.dataset,
            filter: folder.filter,
            datetime: folder.datetime,
            size: folder.size
        }));
    }

    return data;
}

function renderOutputFiles(folder_name)
{

    const currentfolder = breadcrumbs[1];
    const activeViewStyle = $('#changeview').attr('activestyle');
    

    const outputfiles = getOutputFilesData(currentfolder, activeViewStyle);
    const OutputFiles = $('#output-files-container')
    OutputFiles.empty();

    if (activeViewStyle=="grid")
    {
        outputfiles.forEach(output => {
            const filebox = generateOutputElementForGridView(output);
            OutputFiles.append(filebox);
        })
    }
    else{
        outputfiles.forEach(output => {
            const filebox = generateOutputElementForListView(output);
            OutputFiles.append(filebox);
        })
    }


}

function generateOutputElementForGridView(output)
{

    const filebox = $('<div class="output-file filebox"></div>');
    filebox.attr('outputname', output.title)
    filebox.attr('outputid', output.outputid)

    const imagecontainer = $('<div class="file-image-container"></div>')

    const imagepath = './Assets/Images/output_folders/filesystemicons/outline/report_icon.svg'

    const image = $('<img>')
    image
        .addClass('file-image')
        .attr('src',imagepath)
        .attr('alt', "file image")

    imagecontainer.append(image);

    const labelcontainer = $('<div class="file-label-container"></div>')
    
    const label = $('<p></p>')
    label
        .addClass('file-name')
        .text(output.title)

    labelcontainer.append(label)

    filebox.append(imagecontainer, labelcontainer)

    return filebox;
}

function generateOutputElementForListView(output) {
    const imagepath = './Assets/Images/output_folders/filesystemicons/outline/report_icon.svg';

    const outputdiv = $('<div>', {
        class: 'output-file filelist',
        outputname: output.title,
        outputid: output.outputid
    });

    const fileImageContainer = $('<div>', { class: 'file-image-container' });
    const img = $('<img>', {
        class: 'file-image',
        src: imagepath,
        alt: ''
    });

    fileImageContainer.append(img);

    const fileDetailsStatic = $('<div>', { class: 'file-details-static' });

    const title = $('<div>', { class: 'title', text: output.title});
    const analysisName = $('<div>', { class: 'analysisname', text: output.analysisname });

    const metaInfo = $('<div>', { class: 'metainfo' });

    const datasetSpan = $('<span>', { class: 'dataset', text: `Dataset : ${output.dataset}` });
    const filterSpan = $('<span>', { class: 'filter', text: `Filter : ${output.filter}` });
    const dateTimeSpan = $('<span>', { class: 'datetime', text: output.datetime });

    metaInfo.append(datasetSpan, filterSpan, dateTimeSpan);
    fileDetailsStatic.append(title, analysisName, metaInfo);

    const fileDetailsDynamic = $('<div>', { class: 'file-details-dynamic' });

    const emptyDiv1 = $('<div>', { class: 'empty' });
    const fileSize = $('<div>', { class: 'file-size', text: output.size });
    const emptyDiv2 = $('<div>', { class: 'empty' });

    fileDetailsDynamic.append(emptyDiv1, fileSize, emptyDiv2);

    outputdiv.append(fileImageContainer, fileDetailsStatic, fileDetailsDynamic);

    return outputdiv;
}


function renderAnalysisOutput()
{

}

function renderFolderTracker()
{
    const FolderTrackerContainer = $('#folder-tracker')

    FolderTrackerContainer.empty()

    breadcrumbs.forEach((crumb, index) => {
        const breadcrumb = getBreadCrumb(crumb);
        const breadcrumbSeparator = $('<span class="breadcrumb-separator">/</span>');
    
        // Check if the folder is the last one in the list
        if (index < breadcrumbs.length - 1) {
            // Not the last folder, append breadcrumb and separator
            FolderTrackerContainer.append(breadcrumb).append(breadcrumbSeparator);
        } else {
            // Last folder, append only the breadcrumb
            FolderTrackerContainer.append(breadcrumb);
        }
    });
    

}


function getBreadCrumb(folder_name)
{
    let breadcrumb = $('<span></span>')

    breadcrumb
        .addClass('breadcrumb')
        .attr('breadcrumb',folder_name)
        .text(folder_name)


    return breadcrumb;
}