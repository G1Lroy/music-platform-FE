import * as Yup from "yup";

export const uploadSchema = Yup.object().shape({
  title: Yup.string().required("Song title is required"),
  artist: Yup.string().required("Song artist is required"),
  audio: Yup.mixed().required("Audio file is required"),
  image: Yup.mixed().required("Image file is required"),
});
export const authSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Enter your Email"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Enter your Password"),
});
