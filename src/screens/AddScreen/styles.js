import styled from "styled-components/native";

export const RecordButton = styled.TouchableOpacity`
  padding: 5px;
  width: 70px;
  height: 70px;
  border-radius: 40px;
  align-self: center;
  bottom: 5%;
  background-color: #ed3a50;
`;

export const StopRecordingButton = styled.TouchableOpacity`
  padding: 5px;
  width: 80px;
  height: 80px;
  border-width: 6px;
  border-color: #8c2142;
  border-radius: 40px;
  align-self: center;
  bottom: -10%;
`;

export const style = {
  timer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  timerValue: {
    color: "white",
    fontSize: 200,
    alignSelf: "center",
    marginTop: "50%",
  },
  bottomContainer: {
    position: "absolute",
    flex: 1,
    justifyContent: "flex-end",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  background: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.3,
  },
  bottomVideoIconsContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
    opacity: 1,
  },
  stopRecordingSquare: {
    width: 30,
    height: 30,
    backgroundColor: "#ed3a50",
    position: "absolute",
    alignSelf: "center",
    top: 42,
    borderRadius: 5,
  },
};
