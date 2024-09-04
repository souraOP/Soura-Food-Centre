import {request, gql} from 'graphql-request'

const MASTER_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;



// for making get category request from hygraph
const GetCategory=async()=> {

    const query = gql`
    query MyQuery {
        categories(first:50) {
            id
            name
            slug
            icon {
                url
            }
        }
    }`

    const result = await request(MASTER_API_URL, query);
    return result;

}

// for getting the restaurant businesses data from the selected category
const GetBusiness = async(category) => {
    const query = gql`
    query GetBusinessQuery {
        restaurants(where: {category_some: {slug: "`+category+`"}}) {
            aboutUs
            address
            banner {
                url
            }
            category {
                name
            }
            id
            name
            restaurantType
            slug
            workingHours
            review {
                star
            }
        }
    }
    `
    const result = await request(MASTER_API_URL, query);
    return result;
}

// for getting the restaurant details about menu items and their prices etc
const GetBusinessDetails = async(restaurantSlug) =>{
    const query = gql`
        query RestaurantDetails {
        restaurant(where: {slug: "`+restaurantSlug+`"}) {
        aboutUs
        address
        banner {
        url
        }
        category {
        name
        }
        id
        name
        restaurantType
        slug
        workingHours
        menu {
        ... on Menu {
            id
            category
            menuItem {
            ... on MenuItem {
                id
                name
                description
                price
                productImage {
                url
                }
            }
            }
        }
        }
        review {
            star
        }
    }
    }
    `

    const result = await request(MASTER_API_URL, query);
    return result;
}

const AddToCart = async(data) => {
    const query = gql`
    mutation AddToCart {
        createUserCart(
            data: {email: "`+data?.email+`", price: `+data.price+`, productDescription: "`+data.description+`", productImage: "`+data.productImage+`", productName: "`+data.name+`", restaurant: {connect: {slug: "`+data.restaurantSlug+`"}}}
        ) {
            id
        }
        publishManyUserCarts(to: PUBLISHED) {
            count
        }
    }
    `

    const result = await request(MASTER_API_URL, query);
    return result;
}

const GetUserCart = async(userEmail) => {
    const query = gql`
    query GetUserCart {
        userCarts(where: {email: "`+userEmail+`"}) {
            id
            price
            productDescription
            productImage
            productName
            restaurant {
                name
                banner {
                    url
                }
                slug
            }
        }
    }
    `

    const result = await request(MASTER_API_URL, query);
    return result;
}

const RemoveRestaurantFromCart = async(id) => {
    const query = gql`
    mutation RemoveRestaurantFromCart {
        updateUserCart(data: {restaurant: {disconnect: true}}, where: {id: "`+id+`"}) {
            id
        }
        publishManyUserCarts(to: PUBLISHED) {
            count
        }
    }
    `;

    const result = await request(MASTER_API_URL, query);
    return result;
}

const DeleteItemFromCart = async(id) => {
    const query = gql`
    mutation DeleteCartItem {
        deleteUserCart(where: {id: "`+id+`"}) {
            id
        }
    }
    `
    
    const result = await request(MASTER_API_URL, query);
    return result;
}


const AddNewReview = async(data) => {
    const query = gql`
    mutation AddNewReview {
        createReview(
            data: {email: "`+data.email+`", 
            profileImg: "`+data.profileImage+`", 
            reviewText: "`+data.reviewText+`", 
            star: `+data.star+`, 
            userName: "`+data.userName+`", 
            restaurant: {connect: {slug: "`+data.restaurantSlug+`"}}}
        ) {
            id
        }
        publishManyReviews(to: PUBLISHED) {
            count
        }
    }
    `
    const result = await request(MASTER_API_URL, query);
    return result;
}

const GetRestaurantReviewList = async(slug) => {
    const query = gql`
    query RestaurantReviews {
        reviews(where: {restaurant: {slug: "`+slug+`"}}, orderBy: publishedAt_DESC) {
            email
            profileImg
            id
            publishedAt
            star
            userName
            reviewText
        }
    }
    `

    const result = await request(MASTER_API_URL, query);
    return result;
}

const CreateNewOrder = async(data) => {
    const query=gql`
    mutation CreateNewOrder {
        createOrder(
            data: {email: "`+data.email+`", 
            orderAmount: `+data.orderAmount+`, 
            restaurantName: "`+data.restaurantName+`", 
            userName: "`+data.userName+`", 
            address: "`+data.address+`", 
            phone: "`+data.phone+`",
            zipCode: "`+data.zipCode+`"}
        ) {
            id
        }
    }
    `
    const result = await request(MASTER_API_URL, query);
    return result;
}

const UpdateOrderToAddOrderItems = async(name, price, id, email) => {
    const query = gql`
    mutation UpdateOrderWithDetails {
        updateOrder(
            data: {orderDetail: {create: {OrderItem: {data: {name: "`+name+`", price: `+price+`}}}}}
            where: {id: "`+id+`"}
        ) {
            id
        }
        publishManyOrders(to: PUBLISHED) {
            count
        }
        deleteManyUserCarts(where: {email: "`+email+`"}) {
            count
        }   
    }
    `
    const result = await request(MASTER_API_URL, query);
    return result;
}

const GetUserOrders = async(email) => {
    const query = gql`
    query MyUserOrders {
        orders(where: {email: "`+email+`"}, orderBy: publishedAt_DESC) {
            address
            createdAt
            email
            id
            orderAmount
            orderDetail {
                ... on OrderItem {
                    id
                    name
                    price
                }
            }
            phone
            restaurantName
            userName
            zipCode
        }
    }
    `
    const result = await request(MASTER_API_URL, query);
    return result;
}

export default{
    GetCategory,
    GetBusiness,
    GetBusinessDetails,
    AddToCart,
    GetUserCart,
    RemoveRestaurantFromCart,
    DeleteItemFromCart,
    AddNewReview,
    GetRestaurantReviewList,
    CreateNewOrder,
    UpdateOrderToAddOrderItems,
    GetUserOrders
}