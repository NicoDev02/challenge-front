// import axios from 'axios';
// import React from 'react';
// import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
// import styled from 'styled-components/native';

// import apiClient from './axios';
// const Profile = () => {

//   // const products = useAppSelector(state => state.user);
//   const makeAuthenticatedRequest = async (
//     endpoint: string,
//     accessToken: string,
//   ) => {
//     try {
//       console.log(accessToken);
//       const response = await apiClient.get(endpoint);
//       console.log(response.request);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.log(error.response?.data);
//       }
//       console.error(error);
//     }
//   };
//   const StyledText = styled.Text(() => ({
//     color: 'red',
//   }));
//   const handleClick = async () => {};
//   return (
//     <ScrollView>
//       {/* <TouchableOpacity onPress={handleLogin}>
//         <Text>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={handleLogout}>
//         <StyledText>Logout</StyledText>
//       </TouchableOpacity>
//       {token && (
//         <View>
//           <Text>Logged in as {user?.nickname}</Text>
//           <TouchableOpacity
//             onPress={() => makeAuthenticatedRequest('/products', token)}>
//             <Text>Make authenticated request</Text>
//             <TouchableOpacity onPress={handleClick}>
//               <Text>Get User</Text>
//             </TouchableOpacity>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleImagePicker}>
//             <Text>Open images</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//       {!token && <Text>Not logged in</Text>} */}
//     </ScrollView>
//   );
// };

// export default Profile;
