# Installation:
# Step 1: Start a Powershell in Administrator Mode.
# Step 2: Type: "Set-ExecutionPolicy Unrestricted -Force"
# Step 3: In Powershell type: notepad $PROFILE
# Step 4: Type: $ALTV = "PATH_TO_ALTV_ROOT"
# Step 5: Save Profile.
# Step 6: Start Script.
# Press Ctrl+C to exit script.

# make sure you adjust this to point to the folder you want to monitor
$PathToMonitor = $ALTV

# Start AltV-Server
$getProcess = Get-Process altv-server -ErrorAction SilentlyContinue
if($getProcess) {
    Write-Host "Stopping Server if running..."
    Stop-Process -Name "altv-server" -Force
}
Start-Sleep -Seconds 2
Write-Host ""
Write-Host "Starting Server..."
Start-Process -FilePath ./altv-server.exe -PassThru

#explorer $PathToMonitor

$global:Bool = "true"

$FileSystemWatcher = New-Object System.IO.FileSystemWatcher
$FileSystemWatcher.Filter = "*.js"
$FileSystemWatcher.Path  = $PathToMonitor
$FileSystemWatcher.IncludeSubdirectories = $true

# make sure the watcher emits events
$FileSystemWatcher.EnableRaisingEvents = $true

# define the code that should execute when a file change is detected
$Action = {
    $details = $event.SourceEventArgs
    $Name = $details.Name
    $FullPath = $details.FullPath
    $OldFullPath = $details.OldFullPath
    $OldName = $details.OldName
    $ChangeType = $details.ChangeType
    $Timestamp = $event.TimeGenerated
    # you can also execute code based on change type here
    switch ($ChangeType)
    {
        'Changed' { "CHANGE"
        $exclude = @(
            "server.log"
            "cache\"
        )
        if ( -not ($exclude -like "$Name") ) {
          if( $Bool -eq "true" ) {
            $Bool = "false"
          } else {
            $text = "{0} was {1} at {2}" -f $FullPath, $ChangeType, $Timestamp
            Write-Host ""
            Write-Host $text -ForegroundColor Green
            Write-Host ""
            $getProcess = Get-Process altv-server -ErrorAction SilentlyContinue
            if($getProcess) {
                Write-Host "Stopping Server if running..."
                Stop-Process -Name "altv-server" -Force
            }
            Start-Sleep -Seconds 2
            Write-Host ""
            Write-Host "Starting Server..."
            Start-Process -FilePath ./altv-server.exe -PassThru
            $Bool = "true"
          }
        }
      }
        'Created' { "CREATED"}
        'Deleted' { "DELETED"
            # uncomment the below to mimick a time intensive handler
            <#
            Write-Host "Deletion Handler Start" -ForegroundColor Gray
            Start-Sleep -Seconds 4    
            Write-Host "Deletion Handler End" -ForegroundColor Gray
            #>
        }
        'Renamed' { 
            # this executes only when a file was renamed
            $text = "File {0} was renamed to {1}" -f $OldName, $Name
            Write-Host $text -ForegroundColor Yellow
        }
        default { Write-Host $_ -ForegroundColor Red -BackgroundColor White }
    }
}

# add event handlers
$handlers = . {
    Register-ObjectEvent -InputObject $FileSystemWatcher -EventName Changed -Action $Action -SourceIdentifier FSChange
    Register-ObjectEvent -InputObject $FileSystemWatcher -EventName Created -Action $Action -SourceIdentifier FSCreate
    Register-ObjectEvent -InputObject $FileSystemWatcher -EventName Deleted -Action $Action -SourceIdentifier FSDelete
    Register-ObjectEvent -InputObject $FileSystemWatcher -EventName Renamed -Action $Action -SourceIdentifier FSRename
}

Write-Host "Watching for changes to $PathToMonitor"

try
{
    do
    {
        $seconds = 10
        1..$seconds |
        ForEach-Object { $percent = $_ * 100 / $seconds; 
        
        Write-Progress -Activity "Monitoring files..." -Status "$($seconds - $_) seconds remaining..." -PercentComplete $percent; 
        
        Start-Sleep -Seconds 1
        }
    } while ($true)
}
finally
{
    $getProcess = Get-Process altv-server -ErrorAction SilentlyContinue
    if($getProcess) {
        Write-Host ""
        Write-Host "Stopping Server if running..."
        Start-Sleep -Seconds 2
        Stop-Process -Name "altv-server" -Force
    }
    # this gets executed when user presses CTRL+C
    # remove the event handlers
    Unregister-Event -SourceIdentifier FSChange
    Unregister-Event -SourceIdentifier FSCreate
    Unregister-Event -SourceIdentifier FSDelete
    Unregister-Event -SourceIdentifier FSRename
    # remove background jobs
    $handlers | Remove-Job
    # remove filesystemwatcher
    $FileSystemWatcher.EnableRaisingEvents = $false
    $FileSystemWatcher.Dispose()
    "Event Handler disabled."
}