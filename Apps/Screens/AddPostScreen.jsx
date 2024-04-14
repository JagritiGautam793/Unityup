import { StyleSheet,View, Text, TextInput, Button ,DatePicker, TouchableOpacity, Image, ToastAndroid, Alert, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'


import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import { Formik } from 'formik';  
import {Picker} from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import {useUser} from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { app } from '../../firebaseConfig';
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';




export default function AddPostScreen() {


  const [image, setImage] = useState(null);
  const db = getFirestore(app);  
  const[categoryList,setCategoryList]=useState([])
  const storage=getStorage();
  const [loading,setLoading]=useState(false);
  // hook from this clerk expo
  const {user}=useUser();



  // const[date,setDate]=useState(new Date());
  const[showPicker,setShowPicker]=useState(false);

  useEffect(()=>{
    
    getCategoryList();


  },[])

  

  const getCategoryList=async()=>{

    setCategoryList([]);
    
    const querySnapshot=await getDocs(collection(db,'Types'))

    querySnapshot.forEach((doc)=>{
      console.log("Docs:",doc.data());
      setCategoryList(categoryList=>[...categoryList,doc.data()])
    })
  }

  // Use to pick image from gallery 

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod=async(value)=>{
    setLoading(true)
    
    // image into firebase
    // Convert Uri to blob file 
    const resp=await fetch(image); 
    const blob=await resp.blob(); 
    const storageRef = ref(storage,'communityPost/'+Date.now()+".jpeg");
    uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).then((resp)=>{
        getDownloadURL(storageRef).then(async(downloadUrl)=>{
          console.log(downloadUrl);
          value.image=downloadUrl; 
          value.userName=user.fullName, 
          value.userEmail=user.primaryEmailAddress.emailAddress;
          value.userImage=user.imageUrl;
          
          const docRef= await addDoc(collection(db,"UserPost"),value)
          if(docRef.id){
            // whatever the value posted will print it out
            setLoading(false);
            Alert.alert("Post added Successfully!!") 
          }
        })
      });


  }

  return (
    <View className="p-5"> 
    <View className="flex flex-row gap-20 align-top">
      <Text className="text-[20px] font-bold textAlign-center">Report Issue</Text>
      {/* <Ionicons className="flex flex-row  " name="add-circle-outline" size={45} color="black" /> */}

      </View>
      <Text className="text-[15px] text-gray-500  mb-3">"Be the part of change"</Text> 
      
      <Formik
      initialValues={{title:'',desc:'',price:'',category:'',address:'',image:'',userName:'',userEmail:'',userImage:''}} 
      onSubmit={value=>onSubmitMethod(value)}
      validate={(values)=>{
        const errors={}
        if(!values.title){
          ToastAndroid.show('Title must be there',ToastAndroid.SHORT)
          errors.name="Title must be there "
        } 
        // if(!values.desc){
        //   ToastAndroid.show('Description must be there',ToastAndroid.SHORT)
        //   errors.name="Description must be there "
        // } 
        // if(!values.datetime){
        //   ToastAndroid.show('Date Time must be there',ToastAndroid.SHORT)
        //   errors.name="Date Time must be there "
        // }
        // if(!values.address){
        //   ToastAndroid.show('Address must be there',ToastAndroid.SHORT)
        //   errors.name="Address must be there "
        // } 
        // if(!values.category){
        //   ToastAndroid.show('Please select the desired category',ToastAndroid.SHORT)
        //   errors.name="Category must be there "
        // } 
        
        return errors
      } 
      
      } 
      > 
        {({handleChange,handleBlur,handleSubmit,values,setFieldValue,errors})=>(
          <View>
            <TouchableOpacity onPress={pickImage}>
              {image?
              <Image source={{uri:image}} style={{width:100,height:100,borderRadius:15}}/>
              :
              <Image source={require('./../../assets/images/placeholder.png')}
              style={{ width: 100, height:100, borderRadius: 15 }}
              />
              }
            
            </TouchableOpacity>
          <TextInput
          style={styles.input}
          placeholder='Title'
          value={values.title} 
          onChangeText={handleChange('title')}
          /> 
          <TextInput
          style={styles.input}
          placeholder='Description'
          value={values.desc}  
          numberOfLines={5}
          onChangeText={handleChange('desc')}
          />
            
          <TextInput
          style={styles.input}
          placeholder='price'
          value={values?.datetime}  
          keyboardType='default'
          onChangeText={handleChange('datetime')}
          />

          <TextInput
          style={styles.input}
          placeholder='Address'
          value={values?.address}  
          keyboardType='ascii-capable'
          onChangeText={handleChange('address')}
          />
          <View style={{borderWidth:1,borderRadius:10,marginTop:15}}>

          <Picker
          selectedValue={values?.category}
          className="border-2"
          onValueChange={itemValue=>setFieldValue('category',itemValue)}
          >
            {categoryList&&categoryList.map((item,index)=>( 
            <Picker.Item key={index} 
            label={item?.name}
            value={item?.name}/>


            ))}
          </Picker>
          </View>

          
          <TouchableOpacity onPress={handleSubmit}
          style={{
            backgroundColor:loading?'#ccc':'#007BFF'
          }}

          // if loading is true submit button is disabled

          disabled={loading}
          
          className="p-4 bg-blue-500 rounded-full mt-6">
            {loading?
            <ActivityIndicator color='#fff'/>  //activity indicator will basically like a spinnner
            :
            <Text className="text-white text-center text-[12px] ">Submit</Text>

            }
          </TouchableOpacity>

          </View>

        )}

      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    borderWidth:1,
    borderRadius:10,
    padding:10,
    paddingTop:1,
    paddingHorizontal:17,
    fontSize:17,
    marginTop:10,
    marginBottom:2 ,
    textAlignVertical:'top',
    borderWidth:1

  }
  
})