import { ItemType } from "../api/axios";

export const historyPush = ({
  name,
  value,
}: {
  name: string;
  value: string | number | ItemType[];
}) => {
  history.pushState(
    {
      data: Object.assign(history.state ? history.state.data : {}, {
        [name]: value,
      }),
    },
    ""
  );
};
