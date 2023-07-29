//
//  SampleModule.m
//  rn
//
//  Created by N-312 on 2023/07/29.
//

#import <Foundation/Foundation.h>
#import "SampleModule.h"

@implementation SampleModule

{
  bool hasListeners;
}
// Will be called when this module's first listener is added.
-(void)startObserving {
    hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

-(NSArray<NSString *> *)supportedEvents {
    return @[@"sampleEventEmitter"];
}

//- (void)calendarEventReminderReceived:(NSNotification *)notification
//{
//  NSString *eventName = notification.userInfo[@"name"];
//  if (hasListeners) {// Only send events if anyone is listening
//    [self sendEventWithName:@"sampleEventEmitter" body:@{@"name": eventName}];
//  }
//}

RCT_EXPORT_MODULE(SampleModule);

RCT_EXPORT_METHOD(sampleMethodCall:(NSString *)some
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    NSLog(@"sampleMethodCall: some: %@", some);
    resolve([NSString stringWithFormat:@"%@%@", some, @"_sample"]);
    if(hasListeners){
      [self sendEventWithName:@"sampleEventEmitter" body:@{@"eventProperty": [NSString stringWithFormat:@"%@%@", @"someValue", some]}];
    }
  } @catch (NSException *exception) {
    reject(@"sampleMethodCall", exception.reason, nil);
  }
}

@end
