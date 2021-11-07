import AppLayout from "layouts/AppLayout";

const FullScreenLayout = (props) => (
  <AppLayout contentBoxProps={{ maxHeight: "calc(100vh - 88px)" }} {...props} />
);

export default FullScreenLayout;
