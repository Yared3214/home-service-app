const { gql, default: request } = require("graphql-request");

const MASTER_URL = 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/'+process.env.NEXT_PUBLIC_MASTER_URL_KEY+'/master';

const getCategory = async() => {
    const query = gql`
    query Category {
        categories {
          bgcolor {
            hex
          }
          icon {
            url
          }
          id
          name
        }
      }
      `
      const result = await request(MASTER_URL, query);
      return result;
}

const getBusinessList = async() => {
  const query = gql`
  query BusinessList {
    businessLists {
      about
      address
      contactPerson
      email
      category {
        name
      }
      images {
        url
      }
      id
      name
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}

const getBusinessByCategory = async(category) => {
  const query = gql `
  query MyQuery {
    businessLists(where: {category: {name: "`+category+`"}}) {
      about
      address
      category {
        name
      }
      contactPerson
      email
      id
      name
      images {
        url
      }
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}

const getBusinesById = async(id) => {
  const query = gql`
  query GetBusinessByList {
    businessList(where: {id: "`+id+`"}) {
      about
      address
      category {
        name
      }
      contactPerson
      email
      id
      images {
        url
      }
      name
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}

const saveBooking = async(date, time, userEmail, userName, businessId) => {
  const query = gql`
  mutation saveBooking {
    createBooking(
      data: {
        bookingStatus: Booked, 
        date: "`+date+`", 
        time: "`+time+`", 
        userEmail: "`+userEmail+`", 
        userName: "`+userName+`", 
        businessList: {connect: {id: "`+businessId+`"}}}
    ) {
      id
      userName
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}

// const deleteBooking = async(id) => {
//   const query = gql`
//   mutation removeBooking {
//     deleteBooking(where: {id: "`+id+`"}){
//       id
//     } 
//   }`
//   const result = await request(MASTER_URL, query);
//   return result;
// }

const BusinessBookedSlot = async(id, date) => {
  const query = gql`
  query BusinessBookedSlot {
    bookings(where: {businessList: {id: "`+id+`"}, date: "`+date+`"}) {
      date
      time
    }
  }`
  const result = await request(MASTER_URL, query);
  return result;
}

const getUserBookingHistory = async(userEmail) => {
  const query = gql`
  query GetUserBookingHistory {
    bookings(where: {userEmail: "`+userEmail+`"}
    orderBy: publishedAt_DESC
    ) {
      businessList {
        name
        images {
          url
        }
        contactPerson
        address
      }
      date
      time
    }
  }
  `
  const result = await request(MASTER_URL, query);
  return result;
}
export default {
getCategory,
getBusinessList,
getBusinessByCategory,
getBusinesById,
saveBooking,
BusinessBookedSlot,
getUserBookingHistory,
}