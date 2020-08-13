import React, { useEffect, useRef } from 'react';
import Video from 'react-native-video';

const Player = ({
  uri,
  paused,
  onProgress,
  onLoad,
  onComplete,
  onError,
  seekPosition,
}) => {
  const videoRef = useRef();
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seek(seekPosition);
    }
  }, [seekPosition]);
  const loadStart = () => {};
  const setDuration = (data) => {
    onLoad(data);
  };
  const setTime = (data) => {
    onProgress(data);
  };
  const onEnd = () => {
    onComplete();
  };
  const videoError = (error) => {
    console.log('error', error);
    onError(error);
  };
  const onBuffer = () => {
    console.log('buffering');
  };
  const onTimedMetadata = (event) => {
    console.log('on timed metatdata', event);
  };
  return (
    <Video
      source={{
        uri
      }} // Can be a URL or a local file.
      ref={videoRef} // Store reference
      rate={1.0} // 0 is paused, 1 is normal.
      volume={1.0} // 0 is muted, 1 is normal.
      muted={false} // Mutes the audio entirely.
      paused={paused} // Pauses playback entirely.
      resizeMode="cover" // Fill the whole screen at aspect ratio.*
      repeat={false} // Repeat forever.
      playInBackground={false} // Audio continues to play when app entering background.
      // eslint-disable-next-line max-len
      playWhenInactive={false} // [iOS] Video continues to play when control or notification center are shown.
      ignoreSilentSwitch="ignore" // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
      progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
      onLoadStart={loadStart} // Callback when video starts to load
      onLoad={setDuration} // Callback when video loads
      onProgress={setTime} // Callback every ~250ms with currentTime
      onEnd={onEnd} // Callback when playback finishes
      onError={videoError} // Callback when video cannot be loaded
      onBuffer={onBuffer} // Callback when remote video is buffering
      onTimedMetadata={onTimedMetadata} // Callback when the stream receive some metadata
      //   style={styles.backgroundVideo}
    />
  );
};

export default Player;
