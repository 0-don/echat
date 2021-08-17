/// <reference types="react" />
/**
 *  Copyright (c) Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the license found in the
 *  LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';
export interface Props {
    onRun: (data?: any) => void;
    onStop: () => void;
    isRunning: boolean;
    operations: any[];
}
export interface State {
    optionsOpen: boolean;
    highlight: any;
}
declare const _default: React.ComponentClass<Props>;
export default _default;
