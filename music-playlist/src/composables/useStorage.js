import { projectStorage } from '../firebase/config'
import { ref } from "vue"
import getUser from "./getUser"

// Pull user property out of getUser composable 
const { user } = getUser()

const useStorage = () => {
  // Init error, url and filePath refs and set them all to a default of null
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  // Function that makes a request to Firebase to upload an image
  const uploadImage = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`
    const storageRef = projectStorage.ref(filePath.value)

    try {
      const res = await storageRef.put(file)
      url.value = await res.ref.getDownloadURL()
    } catch (err) {
      console.log(err.message)
      error.value = err
    }
  }

  // Function that makes a request to Firebase to delete an image
  const deleteImage = async (path) => {
   // Reference to Firebase storage
   const storageRef = projectStorage.ref(path)
   try{
     await storageRef.delete()
   }catch(err){
     console.log(err.message)
     error.value = err.message
   }
  }
  return { deleteImage, uploadImage, url, filePath, error }
}

export default useStorage;