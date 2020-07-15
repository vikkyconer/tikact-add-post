// import styled from 'styled-components/native';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    marginTop: 10,
    // flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    padding: 10,
  },
  row: {
    flexDirection: row,
  },
  description: {
    fontSize: 15,
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
  },
  recordButton: {
    padding: 10,
    width: 80,
    height: 80,
    borderWidth: 6,
    borderColor: "#8c1227",
    borderRadius: 40,
    alignSelf: "center",
    bottom: "5%",
    position: absolute,
    backgroundColor: "#fe2b54",
  },
});