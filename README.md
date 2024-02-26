![ArtCast](public/landing-logo.webp "ArtCast")

# Integrating Farcaster into ikigAI Labs XYZ's Tech Stack

Welcome to the official GitHub repository of ikigAI Labs XYZ's Farcaster integration project. Here, we document our strategic journey towards adopting the Farcaster protocol into our technology stack, a move that signifies our commitment to innovation, decentralization, and the cultivation of a vibrant, crypto-centric community. This repository serves as a comprehensive guide detailing the rationale, process, and steps involved in seamlessly integrating Farcaster and its components, such as Hubble, into our operations.

## Why Farcaster?

Farcaster is a decentralized social networking protocol that redefines the essence of digital interaction. By championing user control, data ownership, and censorship resistance, Farcaster aligns with our core values of user empowerment and community-driven development. It facilitates direct engagement with Web3 functionalities, including NFT minting and cryptocurrency transactions, directly within the social networking interface. This compatibility makes Farcaster an exemplary choice for enhancing our content distribution strategies and community engagement efforts.

## Hubble: A Pillar of Decentralization

Hubble, a key implementation of a Farcaster Hub, plays a pivotal role in establishing a private instance of the Farcaster network. It enables us to access the latest data, store messages, and contribute to the network's decentralization. Adopting Hubble underscores our dedication to leveraging decentralized systems for superior data management and application development.

## Implementing Farcaster: Our Approach

### 1. **Setting Up the Environment**
Our first step involves preparing the necessary infrastructure to interact with Farcaster and Hubble. This preparation includes configuring our development environment to support TypeScript and Rust, ensuring compatibility with Farcaster's protocol, and setting up an ETH wallet with sufficient funds on the Optimism network.

### 2. **Establishing a Farcaster Account**
We programmatically create a Farcaster account, encompassing on-chain transactions for account registration, storage renting, and message signing key addition. This process culminates in publishing our first "Hello World" message, marking our initial foray into the Farcaster ecosystem.

### 3. **Integrating Hubble into Our Tech Stack**
With our Farcaster account ready, we proceed to integrate Hubble by installing and configuring it on our servers. This step ensures our applications can access data from the Hubble instance, promoting secure and efficient data synchronization across the Farcaster network.

### 4. **Application Development and Community Engagement**
Finally, we leverage our integrated infrastructure to develop applications that benefit from real-time data access and decentralized networking, thereby enhancing our community engagement strategies and improving content distribution.

## A New Era of Social Media with Farcaster and Warpcast

Farcaster is not just another social network; it's a revolutionary platform that addresses crucial concerns around privacy, data ownership, and censorship resistance. Warpcast, a social media channel built on Farcaster, exemplifies the potential of decentralized networks to create secure, transparent, and user-centric spaces online. It introduces innovative concepts like decentralized moderation, empowering the community to guide platform governance and foster a democratic online environment.

Our commitment to Farcaster reflects our belief in its potential to redefine Web3 social media. As we embark on this journey, we invite the community of developers, creators, and innovators building on Farcaster to collaborate with us in shaping the future of decentralized digital interactions.

Explore more about Farcaster and Warpcast:
- [Farcaster Protocol](https://www.farcaster.xyz/)
- [Warpcast Social Network](https://warpcast.com/)

Join us in this exciting venture as we delve into the possibilities that Farcaster brings to the Web3 space, laying the groundwork for a more inclusive, transparent, and equitable online community.

# IKIGAI ARTCAST V1

An Ikigai Labs Farcaster client that enables you to sign in with Farcaster, see & create casts, and mint any cast as an NFT.

ToDo: Use thirdweb engine to mint casts from farcaster as an NFT.

## Set up

- Add deployed edition contract from thirdweb.

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

```bash
NEYNAR_API_KEY=
NEXT_PUBLIC_NEYNAR_CLIENT_ID=
TW_ENGINE_URL=
TW_ACCESS_TOKEN=
TW_BACKEND_WALLET==
TW_SECRET_KEY=
NFT_CONTRACT_ADDRESS=
```

### Run Locally

Install dependencies:

```bash
  yarn
```

Start the server:

```bash
  yarn start
```


## Contributing

