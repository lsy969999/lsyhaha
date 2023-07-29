//
//  SampleModule.m
//  rn
//
//  Created by N-312 on 2023/07/29.
//

#import <Foundation/Foundation.h>
#import "SampleModule.h"

@implementation SampleModule
RCT_EXPORT_MODULE(SampleModule);

RCT_EXPORT_METHOD(sampleMethodCall:(NSString *)some
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    NSLog(@"sampleMethodCall: some: %@", some);
    resolve([NSString stringWithFormat:@"%@%@", some, @"_sample"]);
  } @catch (NSException *exception) {
    reject(@"sampleMethodCall", exception.reason, nil);
  }
}
@end
