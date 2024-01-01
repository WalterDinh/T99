

import Foundation
import FinalSDK

@objc(Counter)
class Counter: NSObject, ICEkycCameraDelegate {

  var _resolve : RCTPromiseResolveBlock!
  var _reject : RCTPromiseRejectBlock!

  private func openCamera(_ data: NSDictionary) {
    let vc = UIApplication.shared.keyWindow?.rootViewController;

    let objCamera = ICEkycCameraRouter.createModule() as! ICEkycCameraViewController
    if let isVersion = data["VERSION_SDK"] as? Int, isVersion == 1 {
      objCamera.isVersion = Pro
    } else {
      objCamera.isVersion = Normal
    }
    objCamera.flowType = full
    if let isShowResult =  data["SHOW_RESULT"] as? Bool {
      objCamera.isShowResult =  isShowResult
    }
      
    if let isHelp = data["IS_SHOW_HELP"] as? Bool {
      objCamera.isShowHelp = isHelp
    }
    
    if let logo = data["LOGO"] as? String {
      objCamera.logoTrademarkImage = UIImage(named: logo) ?? UIImage();
    }
    
    let isType = data["DOCUMENT_TYPE"] as? Int
    switch isType {
    case 1:
      objCamera.isType = cmt
      break
    case 2:
      objCamera.isType = hochieu
      break
    case 3:
      objCamera.isType = cmtquandoi
      break
    case 4:
      objCamera.isType = banglaixe
      break
    default:
      objCamera.isType =  cmt
      break
    }
    
    objCamera.cameraDelegate = self
    objCamera.isAddFace = false
    objCamera.languageApplication = "vi"
    objCamera.modalPresentationStyle = .fullScreen
    vc!.showDetailViewController(objCamera, sender: nil)
  }
  func kycNetworkDidCallApiWithData(params: Any, onSuccess success: @escaping (Any) -> Void, onFailure failure: @escaping (Error?, [String : Any]) -> Void) {

  }

  func getResult() {
    let info = Util.dictionary(SaveData.shared().jsonInfo as? String ?? "") ?? [:]
    let compareFace = Util.dictionary(SaveData.shared().jsonCompareFace as? String ?? "") ?? [:]
    let liveness = Util.dictionary(SaveData.shared().jsonLivenessFace as? String ?? "") ?? [:]
    let veryFace = Util.dictionary(SaveData.shared().jsonVerifyFace as? String ?? "") ?? [:]
    let addFace = Util.dictionary(SaveData.shared().jsonAddFace as? String ?? "") ?? [:]
    let livenessCardBack = Util.dictionary(SaveData.shared().jsonCheckLivenessBackCard) ?? [:]
    let livenessCardFont = Util.dictionary(SaveData.shared().jsonCheckLivenessFrontCard) ?? [:]
    let imgBack = Util.saveImageLocal(SaveData.shared().imageBack, fileName: "IMAGE_BACK")?.absoluteString ?? ""
    let imgfont = Util.saveImageLocal(SaveData.shared().imageFront, fileName: "IMAGE_FRONT")?.absoluteString ?? ""
    let imgFace = Util.saveImageLocal(SaveData.shared().imageFront, fileName: "IMAGE_FACE")?.absoluteString ?? ""
    let data = ["INFO_RESULT": info, "COMPARE_RESULT": compareFace, "LIVENESS_RESULT": liveness, "MASKED_FACE_RESULT": veryFace, "REGISTER_RESULT": addFace, "FRONT_IMAGE": imgfont as Any, "REAR_IMAGE": imgBack, "PORTRAIT_IMAGE": imgFace, "LIVENESS_CARD_FRONT_RESULT": livenessCardBack,  "LIVENESS_CARD_REAR_RESULT" : livenessCardFont] as [String : Any]
    self._resolve(data)
  }

   @objc
  func startChecking(_ data: NSDictionary ,
                     resolver resolve: @escaping RCTPromiseResolveBlock,
                     rejecter reject: @escaping RCTPromiseRejectBlock) {
    SaveData.shared().sdTokenKey = data["TOKEN_KEY"] as! String;
    SaveData.shared().sdTokenId  = data["TOKEN_ID"] as! String
    SaveData.shared().sdAuthorization = data["ACCESS_TOKEN"]  as! String
    self._reject = reject
    self._resolve = resolve
    DispatchQueue.main.async {
      self.openCamera(data)
    }
   }
}

class Util {
  static  func dictionary(_ text: String) -> [String: Any]? {
    if let data = text.data(using: .utf8) {
      do {
        return try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
      } catch {
        print(error.localizedDescription)
      }
    }
    return [:]
  }

  static func saveImageLocal(_ image: UIImage?, fileName: String) -> URL? {
      let documentsDirectory = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]

      let fileName = "\(fileName).jpeg"
      let fileURL = documentsDirectory.appendingPathComponent(fileName)
    if image != nil, let data = image!.jpegData(compressionQuality:  1.0) {
          do {
              try data.write(to: fileURL, options: .atomic)
              return fileURL

          } catch {
              print("error saving file:", error)
          }
      }
      return nil
  }
}
