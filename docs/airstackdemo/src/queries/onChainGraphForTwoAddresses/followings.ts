export const mutualFollower = `query Followings($user: Identity!) {
    farcasterFollowing: SocialFollowings(
      input: {filter: {identity: {_eq: $user}, dappName: {_eq: farcaster}}, blockchain: ALL, limit: 200}
    ) {
      Following {
        followingAddress {
          addresses
          domains {
            name
            isPrimary
            tokenNft {
              tokenId
              address
              blockchain
            }
          }
          mutualFollower: socialFollowers(
            input: {filter: {identity: {_eq: $user}, dappName: {_eq: farcaster}}}
          ) {
            Follower {
              followerAddress {
                socials {
                  profileName
                  profileHandle
                }
              }
            }
          }
        }
      }
    }
    lensFollowing: SocialFollowings(
      input: {filter: {identity: {_eq: $user}, dappName: {_eq: lens}}, blockchain: ALL, limit: 200}
    ) {
      Following {
        followingAddress {
          addresses
          domains {
            name
            isPrimary
            tokenNft {
              tokenId
              address
              blockchain
            }
          }
          mutualFollower: socialFollowers(
            input: {filter: {identity: {_eq: $user}, dappName: {_eq: lens}}}
          ) {
            Follower {
              followerAddress {
                socials {
                  profileName
                  profileHandle
                }
              }
            }
          }
        }
      }
    }
  }`;
