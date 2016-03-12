using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace angular.design {

 /***** 
        GetJSBundleFiles.angularSrcFiles(
          @"d:\temp\angular-master\", //angular 2 sources from github
          @"d:\temp\Angular\Angular\", //typescript project for .d.ts generation
          @"d:\LMCom\rew2\angular\node_modules\angular2\bundles\angular2.dev.js", //captured .JS bundle (from CDN)
          @"d:\LMCom\rew2\angular\node_modules\angular2\bundles\http.dev.js",
          @"d:\LMCom\rew2\angular\node_modules\angular2\bundles\router.dev.js"
        );
        GetJSBundleFiles.rxjsSrcFiles(
          @"d:\temp\RxJS-master\", //RxJS sources from github. Rename <src> dir to <rxjs> first!!! 
          @"d:\temp\Angular\Angular\", //typescript project for .d.ts generation
          @"d:\LMCom\rew2\angular\node_modules\rxjs\bundles\Rx.js" //captured .JS bundle (from CDN)
        );
 */


  public static class GetJSBundleFiles {

    //parse .JS bundle file for System.register("XXX"
    static IEnumerable<string> parseBundle(string fn) {
      return File.ReadAllLines(fn).Select(l => {
        var g = getFile.Match(l).Groups["fn"];
        return g != null ? g.Value : null;
      }).Where(f => !string.IsNullOrEmpty(f));
    }
    static Regex getFile = new Regex(@"^System.register\(""(?<fn>[^""]*)");

    //copy files from gitHub sources to typescript project
    static void copySrcFiles(string srcDir, string destDir, IEnumerable<string> modules) {
      foreach (var f in modules) {
        var src = srcDir + f.Replace('/', '\\') + ".ts";
        if (!File.Exists(src)) throw new Exception("File " + src + " does not exist!");
        var dest = destDir + f.Replace('/', '\\') + ".ts";
        var destDr = Path.GetDirectoryName(dest);
        if (!Directory.Exists(destDr)) Directory.CreateDirectory(destDr);
        File.Copy(src, dest, true);
      }
    }

    //angular files, needed for typescript compilation, which are not referenced from JS bundle
    static string[] angularByHand = new string[] {
      "angular2/src/facade/base_wrapped_exception",
      "angular2/src/core/reflection/types",
      "angular2/src/core/reflection/platform_reflection_capabilities",
      "angular2/src/core/change_detection/pipe_transform",
      "angular2/src/common/forms/directives/form_interface",
      "angular2/src/common/directives/ng_plural",
      "angular2/src/router/rules/route_handlers/route_handler",
      "angular2/src/router/interfaces"
    };

    //rxjs files, needed for typescript compilation, which are not referenced from JS bundle
    static string[] rxjsByHand = new string[] {
      "rxjs/Scheduler",
      "rxjs/scheduler/Action",
      "rxjs/scheduler/async",
      "rxjs/scheduler/AsyncScheduler",
      "rxjs/observable/IfObservable",
      "rxjs/add/observable/of"
    };


    public static void angularSrcFiles(string gitHubSourceDir, string destDir, params string[] bundles) {
      // 1. take angular, http and router .JS bundles, concat with angularByHand modules
      // 2. extract module names from System.register("XXX", found in JS files
      var modules = bundles.SelectMany(bundle => parseBundle(bundle)).Concat(angularByHand).Distinct().OrderBy(s => s).ToArray();
      // 3. copy module .TS files from angular github source (which alow bug free typescript compilation)
      copySrcFiles(gitHubSourceDir + @"modules\", destDir, modules);
      // 4. list all files
      File.WriteAllLines(destDir + @"\allAngular.txt", modules);
    }

    public static void rxjsSrcFiles(string gitHubSourceDir, string destDir, string bundle) {
      // 1. take rxjs .JS bundles, concat with rxjsByHand modules
      // 2. extract module names from System.register("XXX", found in JS files
      var modules = parseBundle(bundle).Concat(rxjsByHand);
      // 3. copy module .TS files from rxjs github source (which alow bug free typescript compilation)
      copySrcFiles(gitHubSourceDir, destDir, modules);
      // 4. list all files
      File.WriteAllLines(destDir + @"\allRxjs.txt", modules);
    }
  }
}