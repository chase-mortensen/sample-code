
import tweepy
# sys.setdefaultencoding('utf8')
import time
import json
import dataset
from textblob import TextBlob

dbAllTweets = dataset.connect("sqlite:///tweetsFor24hrs.db")

#Reading twitter API's credentials from a file
fileReader = open('twitter_secret.txt','r')
lines = (fileReader.readlines())
consumer_key = lines[0]
consumer_secret = lines[1]
access_token = lines[2]
access_token_secret =lines[3]
fileReader.close()



# OAuth process, using the keys and tokens
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

# Creation of the actual interface, using authentication
api = tweepy.API(auth)

start_time = time.time()
print(start_time)
limit = 86400
totalTweets = 0
positive = 0
negative = 0


class StreamListener(tweepy.StreamListener):
    def on_status(self, status):
        #         if status.text.startswith('RT'):     #Filtering out re-tweets
        #             return
        global positive
        global negative
        global totalTweets

        description = status.user.description
        loc = status.user.location
        text = status.text
        coords = status.coordinates
        name = status.user.screen_name
        user_created = status.user.created_at
        followers = status.user.followers_count
        id_str = status.id_str
        created = status.created_at
        retweets = status.retweet_count
        bg_color = status.user.profile_background_color

        if (time.time() - start_time) > limit:
            print(time.time())
            print("Total tweets =", totalTweets)
            return False
        blob = TextBlob(text)
        sent = blob.sentiment

        polarity = sent.polarity
        subjectivity = sent.subjectivity
        if polarity > 0:
            positive += 1
        if polarity < 0:
            negative += 1

        totalTweets += 1
        if totalTweets % 1000 == 0:
            print("Total tweets = ", totalTweets)
            print("Positive = ",positive/totalTweets*100, " %")
            print("Negative = ",negative/totalTweets*100, " %")

        if coords is not None:
            coords = json.dumps(coords)

        table = dbAllTweets["tweets"]
        table.insert(dict(
            user_description=description,
            user_location=loc,
            coordinates=coords,
            text=text,
            user_name=name,
            user_created=user_created,
            user_followers=followers,
            id_str=id_str,
            created=created,
            retweet_count=retweets,
            user_bg_color=bg_color,
            polarity = sent.polarity,
            subjectivity = sent.subjectivity


        ))
        # print(text + ' => ' + str(polarity))
        return



    def on_error(self, status_code):
        if status_code == 420:
            return False




stream_listener = StreamListener()
stream = tweepy.Stream(auth=api.auth, listener=stream_listener)
keywordsListA = ["covid", 'Covid',"COVID", 'corona', 'CORONA', 'Corona', 'pandemic',  'Pandemic', 'PANDEMIC' ]

while True:
    try:
        stream.filter(track=keywordsListA, stall_warnings=True)
    except (ProtocolError, AttributeError):
        continue
