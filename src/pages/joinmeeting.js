/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import React  from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import "./../jitsi.css"
import { endMeeting } from '../service/apiServices/jistsiMeetingServices'

const useMenuStyles = makeStyles({
  paper: {
    maxHeight: "calc(100% - 96px)",
    WebkitOverflowScrolling: "touch",
  },
  list: {
    outline: 0,
  },
});

const Joinmeeting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [api, setapi] = React.useState(null);
  const [isAudioMuted, setisAudioMuted] = React.useState(true);
  const [isVideoMuted, setisVideoMuted] = React.useState(true);
  
 

  const loadJitsiScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = resolve
      document.body.appendChild(script);
    });
  const startMeet = async () => {
    let userName = localStorage.getItem('Username')
    let name = location.search.slice(1);
    const domain = 'jitsi.gain.care';
    const options = {
      roomName: name,
      width: '100%',
      height: '100%',
      configOverwrite: {
        prejoinPageEnabled: false,
        startWithAudioMuted: isAudioMuted,
        startWithVideoMuted: isVideoMuted,
      },
      interfaceConfigOverwrite: {
        // overwrite interface properties
        SHOW_JITSI_WATERMARK: false,
        filmStripOnly: false,
      },
      parentNode: document.querySelector("#jitsi-iframe"),
      whiteboard: {
        enabled: true,
        collabServerBaseUrl: "https://excalidraw-backend.example.com",
      },
      userInfo: {
        displayName: userName,
      },
    };
    let a = new window.JitsiMeetExternalAPI(domain, options);

    setapi(a);
    a.on('readyToClose', async (e) => {
      let res = await endMeeting(name)
      a.executeCommand('hangup');
      let type = localStorage.getItem('type');

      if (res.type === 'Success') {

        if (type === '4') {
          navigate('/managemeeting')
        } else {
          navigate("/managemeet");
        }
      }
    })
  };
  const initialiseJitsi = async () => {
  
    if (
      !window.JitsiMeetExternalAPI ||
      window.JitsiMeetExternalAPI === undefined
    ) {
      await loadJitsiScript();
    }

    startMeet();
    setisAudioMuted();
    setisVideoMuted();
    

  };

  React.useEffect(() => {
    // document.exitFullscreen()
    initialiseJitsi();
  }, []);
// NOSONAR Start
  // const executeCommand = (command) => {
  //   api.executeCommand(command);

  //   if (command === "toggleAudio") {
  //     setisAudioMuted(false);
  //   }
  //   if (command === "toggleVideo") {
  //     setisVideoMuted(false);
  //   }
  //   if (command === "hangup") {
  //     let type = localStorage.getItem('type');
  //     setFullScreen(false);
  //     document.exitFullscreen()
  //     if (type === '4') {
  //       navigate('/managemeeting')
  //     } else {
  //       navigate("/managemeet");
  //     }
  //   }
  //   if (command === "startRecording") {
  //     api.executeCommand("startRecording", {
  //       mode: "local", //recording mode, either `local`, `file` or `stream`.
  //       onlySelf: false, //Whether to only record the local streams. Only applies to `local` recording mode.
  //       shouldShare: true, //whether the recording should be shared with the participants or not. Only applies to certain jitsi meet deploys.
  //     });
  //     setRecord("Stop recording");
  //   }
  //   if (command === "stopRecording") {
  //     api.executeCommand("stopRecording", "local");
  //     setRecord("Start recording");
  //   }

  //   if (command === "toggleParticipantsPane") {
  //     api.executeCommand("toggleParticipantsPane", true);
  //   }

  // };
  // const handleParticipantJoined = async (participant) => {
  //   const data = await getParticipants();
  // };

  // const recordingState = () => {
  //   if (record === "Start recording") {
  //     executeCommand("startRecording", { mode: "local" });
  //   } else if (record === "Stop recording") {
  //     executeCommand("stopRecording", { mode: "local" });
  //   }
  // };

  // const getParticipants = () => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(api.getParticipantsInfo()); // get all participants
  //     }, 500);
  //   });
  // };
  // NOSONAR End
  return (
    <>
      <div id="jitsi-iframe"></div>

{api}
      {/* // NOSONAR Start  <div className="meeting-box">
        <div className="meeting-menus">
          <Box className="img-wrap">
            <img src={Logo}></img>
          </Box>
          <Box className="meet-btns">
            <IconButton

              size="large"
              className="btn-active"
              onClick={() => executeCommand("toggleAudio")}
            >
              <KeyboardVoiceIcon />
            </IconButton>
            <IconButton
              size="large"
              className="videoicon"
              onClick={() => executeCommand("toggleVideo")}
            >
              {isVideoMuted === false ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
            <IconButton
              size="large"
              className="screenshareicon"
              onClick={() => executeCommand("toggleShareScreen")}
            >
              <ScreenShareIcon />
            </IconButton>
            <IconButton
              size="large"
              className="speakericon"
              onClick={() => executeCommand("toggleChat")}
            >
              <SpeakerNotesIcon />
            </IconButton>
            <IconButton
              size="large"
              className="pantoolicon"
              onClick={() => executeCommand("toggleRaiseHand")}
            >
              <PanToolIcon />
            </IconButton>
            <IconButton
              size="large"
              className="btn-danger"
              onClick={() => executeCommand("hangup")}
            >
              <PhoneIcon />
            </IconButton>
          </Box>


          <Box className="meet-rht">
            <Typography className="meet-text">
              General service meeting for maintanence{" "}
            </Typography>

            <PopupState variant="popper" popupId="demo-popup-popper">
              {(popupState) => (
                <div>
                  <IconButton
                    size="large"
                    className="moreicon"
                    {...bindToggle(popupState)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Popper className="meet-float" {...bindPopper(popupState)} transition>
                    {({ TransitionProps }) => (
                      <ClickAwayListener onClickAway={popupState.close}>
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper >
                            <MenuList className={menuClasses.list} autoFocus>
                              <MenuItem onClick={() => recordingState()}>
                                <RadioButtonCheckedIcon />
                                &nbsp;{record}
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  executeCommand("toggleParticipantsPane")
                                }
                              >
                                <GroupsIcon />
                                &nbsp;Members
                              </MenuItem>
                              <MenuItem onClick={() => setFullScreen(!fullScreen)}>
                                <OpenInFullIcon />
                                &nbsp;Full Screen
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  api.executeCommand("toggleTileView")
                                }
                              >
                                <ContentPasteIcon />
                                &nbsp;Clipboard
                              </MenuItem>
                            </MenuList>
                          </Paper>
                        </Fade>
                      </ClickAwayListener>
                    )}
                  </Popper>
                </div>
              )}
            </PopupState>
          </Box>



        </div>
      </div> // NOSONAR End */}

  // END-NOSCAN
    </>
  );
};

export default Joinmeeting;